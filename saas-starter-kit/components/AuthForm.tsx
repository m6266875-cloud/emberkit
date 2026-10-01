'use client';
import { useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';

export default function AuthForm({
  mode,
  configured,
  passwordChanged = false,
}: {
  mode: 'login' | 'signup';
  configured: boolean;
  passwordChanged?: boolean;
}) {
  const signup = mode === 'signup';
  const router = useRouter();
  const hydrated = useHydrated();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      if (signup && !registered) {
        await apiFetch('/api/auth/register', 'POST', { name, email, password });
        setRegistered(true);
      }
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });
      if (!result?.ok || result.error) {
        if (result?.error === 'RATE_LIMITED')
          throw new Error('Too many sign-in attempts. Please wait 15 minutes and try again.');
        if (result?.error === 'NOT_CONFIGURED')
          throw new Error('Accounts are not configured yet. Please follow the setup guide.');
        throw new Error(
          signup
            ? 'Your account was created, but sign-in failed. Try the login page.'
            : 'Email or password is incorrect.',
        );
      }
      router.replace('/dashboard');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to connect. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <p className="eyebrow">
        {signup ? 'Let’s make something great' : 'Your next chapter awaits'}
      </p>
      <h1 className="mt-4 text-[38px] font-semibold leading-tight tracking-[-.05em]">
        {signup ? 'Start with a spark.' : 'Welcome back.'}
      </h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">
        {signup
          ? 'Create your account and give your ideas a place to grow.'
          : 'Good to see you again. Let’s get back to building.'}
      </p>
      {!configured && (
        <div className="mt-6">
          <Notice>
            Connect PostgreSQL and set your auth secret to enable accounts.{' '}
            <Link href="/guide" className="font-semibold underline underline-offset-4">
              View the setup guide
            </Link>
            .
          </Notice>
        </div>
      )}
      {passwordChanged && (
        <div className="mt-6">
          <Notice type="success">Password updated. Sign in again with your new password.</Notice>
        </div>
      )}
      <form method="post" onSubmit={submit} className="mt-8 space-y-5">
        <fieldset className="space-y-5" disabled={pending || !hydrated || !configured}>
          {signup && (
            <div>
              <label htmlFor="auth-name" className="field-label">
                Your name
              </label>
              <input
                id="auth-name"
                name="name"
                className="field"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="field-label">
              Email address
            </label>
            <input
              id="auth-email"
              name="email"
              className="field"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="field-label">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                name="password"
                className="field pr-12"
                type={visible ? 'text' : 'password'}
                placeholder={signup ? 'Make it a strong one' : 'Enter your password'}
                autoComplete={signup ? 'new-password' : 'current-password'}
                required
                minLength={signup ? 10 : 1}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted hover:text-foreground"
                aria-label={visible ? 'Hide password' : 'Show password'}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {signup && <p className="field-help">At least 10 characters. No more than 72 bytes.</p>}
          </div>
          {error && <Notice type="error">{error}</Notice>}
          <button
            type="submit"
            disabled={pending || !configured || !hydrated}
            className="btn-primary w-full"
          >
            {pending ? <LoaderCircle size={17} className="spinner" /> : null}
            {pending
              ? signup
                ? 'Creating your workspace…'
                : 'Signing you in…'
              : signup
                ? 'Create your account'
                : 'Log in to your workspace'}
            {!pending && <ArrowRight size={17} />}
          </button>
        </fieldset>
      </form>
      <noscript>
        <p className="mt-4 text-sm text-muted">
          Enable JavaScript to use secure signup and sign-in.
        </p>
      </noscript>
      <p className="mt-7 text-center text-[13px] text-muted">
        {signup ? 'Already have an account?' : 'New around here?'}{' '}
        <Link
          href={signup ? '/login' : '/signup'}
          className="font-semibold text-foreground underline decoration-line underline-offset-4 hover:decoration-ember"
        >
          {signup ? 'Log in' : 'Create an account'}
        </Link>
      </p>
    </>
  );
}
