import { NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { isAuthConfigured } from '@/lib/env';
import { hashPassword } from '@/lib/passwords';
import { signupSchema } from '@/lib/validation';
import { consumeRateLimit, getClientAddress } from '@/lib/rate-limit';
import { apiResponse, ApiError, assertSameOrigin, readJson } from '@/lib/http';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    if (!isAuthConfigured())
      throw new ApiError(
        503,
        'Set DATABASE_URL and a random NEXTAUTH_SECRET in .env.local to enable accounts.',
      );
    const input = signupSchema.parse(await readJson(request));
    const limit = await consumeRateLimit(
      `signup:ip:${getClientAddress(request.headers)}`,
      20,
      60 * 60 * 1000,
    );
    if (!limit.allowed)
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
      );
    const passwordHash = await hashPassword(input.password);
    const user = await database.user.create({
      data: { name: input.name, email: input.email, passwordHash },
      select: { id: true, name: true, email: true },
    });
    return NextResponse.json({ user }, { status: 201 });
  });
}
