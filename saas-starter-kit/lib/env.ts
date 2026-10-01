import 'server-only';

export function isAuthConfigured() {
  const secret = process.env.NEXTAUTH_SECRET;
  return Boolean(
    process.env.DATABASE_URL &&
    secret &&
    secret.length >= 32 &&
    secret !== 'REPLACE_WITH_A_RANDOM_SECRET',
  );
}

export function isBillingConfigured() {
  return Boolean(
    isAuthConfigured() &&
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_PRICE_ID &&
    process.env.STRIPE_WEBHOOK_SECRET,
  );
}

export function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol))
    throw new Error('Invalid site URL configuration');
  return url.origin;
}
