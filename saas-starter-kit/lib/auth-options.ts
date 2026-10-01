import 'server-only';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { database } from '@/lib/db';
import { isAuthConfigured } from '@/lib/env';
import { loginSchema } from '@/lib/validation';
import { DUMMY_PASSWORD_HASH, verifyPassword } from '@/lib/passwords';
import { consumeRateLimit, getClientAddress } from '@/lib/rate-limit';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Email and password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        if (!isAuthConfigured()) throw new Error('NOT_CONFIGURED');
        const parsed = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!parsed.success) return null;
        const emailLimit = await consumeRateLimit(
          `login:email:${parsed.data.email}`,
          10,
          15 * 60 * 1000,
        );
        const addressLimit = await consumeRateLimit(
          `login:ip:${getClientAddress(request.headers || {})}`,
          60,
          15 * 60 * 1000,
        );
        if (!emailLimit.allowed || !addressLimit.allowed) throw new Error('RATE_LIMITED');
        const user = await database.user.findUnique({ where: { email: parsed.data.email } });
        const valid = await verifyPassword(
          parsed.data.password,
          user?.passwordHash || DUMMY_PASSWORD_HASH,
        );
        if (!user || !valid) return null;
        return { id: user.id, email: user.email, name: user.name, authVersion: user.authVersion };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.authVersion = user.authVersion;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        session.user.authVersion = typeof token.authVersion === 'number' ? token.authVersion : -1;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/') && !url.startsWith('//')) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === new URL(baseUrl).origin) return url;
      } catch {
        /* Reject malformed redirects. */
      }
      return baseUrl;
    },
  },
};
