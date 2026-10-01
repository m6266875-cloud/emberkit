import 'server-only';
import Stripe from 'stripe';
import { ApiError } from '@/lib/http';

let client: Stripe | undefined;
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY)
    throw new ApiError(503, 'Stripe billing is not configured yet.');
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
