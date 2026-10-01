import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSiteUrl, isBillingConfigured } from '@/lib/env';
import { apiResponse, ApiError, assertSameOrigin, requireApiUser } from '@/lib/http';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    if (!isBillingConfigured()) throw new ApiError(503, 'Stripe billing is not configured yet.');
    if (!user.stripeCustomerId)
      throw new ApiError(400, 'There is no billing customer for this account yet.');
    const session = await getStripe().billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${getSiteUrl()}/settings`,
    });
    return NextResponse.json({ url: session.url });
  });
}
