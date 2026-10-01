import type { Metadata } from 'next';
import AuthFrame from '@/components/AuthFrame';
import AuthForm from '@/components/AuthForm';
import { isAuthConfigured } from '@/lib/env';

export const metadata: Metadata = { title: 'Create your account' };
export const dynamic = 'force-dynamic';
export default function SignupPage() {
  return (
    <AuthFrame>
      <AuthForm mode="signup" configured={isAuthConfigured()} />
    </AuthFrame>
  );
}
