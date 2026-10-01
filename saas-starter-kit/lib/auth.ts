import 'server-only';
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { database } from '@/lib/db';
import { authOptions } from '@/lib/auth-options';
import { isAuthConfigured } from '@/lib/env';

export const currentUserSelect = {
  id: true,
  email: true,
  name: true,
  username: true,
  website: true,
  authVersion: true,
  isSubscribed: true,
  stripeCustomerId: true,
  createdAt: true,
} as const;

export const getCurrentUser = cache(async () => {
  if (!isAuthConfigured()) return null;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await database.user.findUnique({
    where: { id: session.user.id },
    select: currentUserSelect,
  });
  // Password changes invalidate every previously issued session.
  if (!user || user.authVersion !== session.user.authVersion) return null;
  return user;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}
