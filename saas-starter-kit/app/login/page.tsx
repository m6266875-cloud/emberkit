import type { Metadata } from 'next';
import AuthFrame from '@/components/AuthFrame';
import AuthForm from '@/components/AuthForm';
import { isAuthConfigured } from '@/lib/env';

export const metadata: Metadata = { title: 'Log in' };
export const dynamic = 'force-dynamic';
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ password?: string }>;
}) {
  return (
    <AuthFrame>
      <AuthForm
        mode="login"
        configured={isAuthConfigured()}
        passwordChanged={(await searchParams).password === 'changed'}
      />
    </AuthFrame>
  );
}
