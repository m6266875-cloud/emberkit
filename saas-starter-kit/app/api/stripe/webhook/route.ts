import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { Prisma } from '@prisma/client';
import { database } from '@/lib/db';
import { getStripe } from '@/lib/stripe';
import { isAuthConfigured } from '@/lib/env';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!isAuthConfigured() || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook billing is not configured.' }, { status: 503 });
  }
  const signature = request.headers.get('stripe-signature');
  if (!signature)
    return NextResponse.json({ error: 'Missing webhook signature.' }, { status: 400 });
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  try {
    if (await database.stripeEvent.findUnique({ where: { id: event.id } }))
      return NextResponse.json({ received: true });
    let checkout: Stripe.Checkout.Session | undefined;
    let subscription: Stripe.Subscription | undefined;
    if (event.type === 'checkout.session.completed') {
      checkout = event.data.object as Stripe.Checkout.Session;
      const subscriptionId =
        typeof checkout.subscription === 'string'
          ? checkout.subscription
          : checkout.subscription?.id;
      if (subscriptionId) subscription = await getStripe().subscriptions.retrieve(subscriptionId);
    } else if (
      [
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
      ].includes(event.type)
    ) {
      const object = event.data.object as Stripe.Subscription;
      // Fetch the current state so an out-of-order event cannot restore an old status.
      subscription = await getStripe().subscriptions.retrieve(object.id);
    }
    await database.$transaction(async (transaction) => {
      if (subscription) {
        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id;
        const data = {
          isSubscribed: ['active', 'trialing'].includes(subscription.status),
          subscriptionStatus: subscription.status,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
        };
        if (checkout?.client_reference_id) {
          await transaction.user.updateMany({ where: { id: checkout.client_reference_id }, data });
        } else if (event.type === 'customer.subscription.created' && subscription.metadata.userId) {
          await transaction.user.updateMany({
            where: { id: subscription.metadata.userId, stripeSubscriptionId: null },
            data,
          });
        } else {
          await transaction.user.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data,
          });
        }
      }
      await transaction.stripeEvent.create({ data: { id: event.id, type: event.type } });
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    // Concurrent retries of the same signed event are safely idempotent.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      (await database.stripeEvent.findUnique({ where: { id: event.id } }))
    ) {
      return NextResponse.json({ received: true });
    }
    console.error(
      'Stripe webhook persistence failed:',
      error instanceof Error ? error.name : 'Unknown error',
    );
    return NextResponse.json(
      { error: 'Unable to process this event. Please retry.' },
      { status: 500 },
    );
  }
}
