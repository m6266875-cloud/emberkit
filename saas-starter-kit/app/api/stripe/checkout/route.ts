import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    customer_email: user.email,
    client_reference_id: user.id,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
