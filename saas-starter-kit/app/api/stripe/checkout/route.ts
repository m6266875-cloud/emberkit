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
    if (user.isSubscribed) throw new ApiError(409, 'You already have an active subscription.');
    const session = await getStripe().checkout.sessions.create(
      {
        mode: 'subscription',
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        customer: user.stripeCustomerId || undefined,
        customer_email: user.stripeCustomerId ? undefined : user.email,
        client_reference_id: user.id,
        subscription_data: { metadata: { userId: user.id } },
        success_url: `${getSiteUrl()}/settings?billing=success`,
        cancel_url: `${getSiteUrl()}/settings?billing=cancelled`,
      },
      {
        idempotencyKey: `checkout-${user.id}-${process.env.STRIPE_PRICE_ID}-${Math.floor(Date.now() / 60_000)}`,
      },
    );
    if (!session.url) throw new ApiError(502, 'Unable to create a checkout session.');
    return NextResponse.json({ url: session.url });
  });
}
