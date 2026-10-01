import 'server-only';
import { createHash } from 'node:crypto';
import { database } from '@/lib/db';

export async function consumeRateLimit(identifier: string, limit: number, windowMs: number) {
  const key = createHash('sha256').update(identifier).digest('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);
  // An atomic PostgreSQL upsert also works across multiple app instances.
  const rows = await database.$queryRaw<{ hits: number; expires_at: Date }[]>`
    INSERT INTO rate_limits (key, hits, expires_at)
    VALUES (${key}, 1, ${expiresAt})
    ON CONFLICT (key) DO UPDATE SET
      hits = CASE WHEN rate_limits.expires_at <= ${now} THEN 1 ELSE rate_limits.hits + 1 END,
      expires_at = CASE WHEN rate_limits.expires_at <= ${now} THEN ${expiresAt} ELSE rate_limits.expires_at END
    RETURNING hits, expires_at
  `;
  return {
    allowed: rows[0].hits <= limit,
    retryAfter: Math.max(1, Math.ceil((rows[0].expires_at.getTime() - now.getTime()) / 1000)),
  };
}

export function getClientAddress(headers: Headers | Record<string, string | string[] | undefined>) {
  const forwarded =
    headers instanceof Headers ? headers.get('x-forwarded-for') : headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() || 'unknown';
}
