import { describe, expect, it } from 'vitest';
import {
  isSafeWebsite,
  loginSchema,
  passwordChangeSchema,
  passwordSchema,
  profileSchema,
  projectIdSchema,
  projectSchema,
  signupSchema,
} from '@/lib/validation';

const validAccount = {
  name: '  Alex Morgan  ',
  email: '  ALEX@EXAMPLE.TEST  ',
  password: 'OnlyForUnitTests_123!',
};

describe('account validation', () => {
  it('normalizes account names and email addresses', () => {
    expect(signupSchema.parse(validAccount)).toEqual({
      ...validAccount,
      name: 'Alex Morgan',
      email: 'alex@example.test',
    });
  });
  it('rejects invalid email addresses', () => {
    expect(signupSchema.safeParse({ ...validAccount, email: 'not-email' }).success).toBe(false);
  });
  it('requires stronger signup passwords', () => {
    expect(signupSchema.safeParse({ ...validAccount, password: 'short' }).success).toBe(false);
  });
  it('enforces bcrypt byte length, including Unicode', () => {
    expect(passwordSchema.safeParse('a'.repeat(72)).success).toBe(true);
    expect(passwordSchema.safeParse('a'.repeat(73)).success).toBe(false);
    expect(passwordSchema.safeParse('😀'.repeat(19)).success).toBe(false);
  });
  it('rejects client-supplied account privilege fields', () => {
    expect(signupSchema.safeParse({ ...validAccount, isSubscribed: true }).success).toBe(false);
  });
  it('does not impose signup minimum length on existing login credentials', () => {
    expect(loginSchema.safeParse({ email: 'alex@example.test', password: 'oldpass' }).success).toBe(
      true,
    );
  });
  it('requires the password to change', () => {
    expect(
      passwordChangeSchema.safeParse({
        currentPassword: validAccount.password,
        newPassword: validAccount.password,
      }).success,
    ).toBe(false);
  });
});

describe('project validation', () => {
  it('trims names, defaults status, and stores empty descriptions as null', () => {
    expect(projectSchema.parse({ name: '  A good idea  ' })).toEqual({
      name: 'A good idea',
      description: null,
      status: 'draft',
    });
  });
  it('rejects empty and overlong names', () => {
    expect(projectSchema.safeParse({ name: '   ' }).success).toBe(false);
    expect(projectSchema.safeParse({ name: 'a'.repeat(101) }).success).toBe(false);
  });
  it('rejects overlong descriptions and unknown statuses', () => {
    expect(projectSchema.safeParse({ name: 'Idea', description: 'a'.repeat(2001) }).success).toBe(
      false,
    );
    expect(projectSchema.safeParse({ name: 'Idea', status: 'admin' }).success).toBe(false);
  });
  it('never accepts an owner ID from the browser', () => {
    expect(projectSchema.safeParse({ name: 'Idea', userId: 'another-user' }).success).toBe(false);
    expect(projectSchema.safeParse({ name: 'Idea', user_id: 'another-user' }).success).toBe(false);
  });
  it('requires a UUID in detail routes', () => {
    expect(projectIdSchema.safeParse('not-a-uuid').success).toBe(false);
    expect(projectIdSchema.safeParse('15d4d44b-b3f9-4b12-9e3c-05db83c2f841').success).toBe(true);
  });
});

describe('profile validation', () => {
  it('normalizes usernames and empty optional fields', () => {
    expect(profileSchema.parse({ name: 'Alex', username: 'ALEX_BUILDS', website: '' })).toEqual({
      name: 'Alex',
      username: 'alex_builds',
      website: null,
    });
  });
  it('rejects invalid usernames', () => {
    expect(profileSchema.safeParse({ name: 'Alex', username: 'a!', website: '' }).success).toBe(
      false,
    );
  });
  it('only permits safe HTTP(S) website links', () => {
    expect(isSafeWebsite('https://example.com')).toBe(true);
    expect(isSafeWebsite('http://example.com')).toBe(true);
    expect(isSafeWebsite('javascript:alert(1)')).toBe(false);
    expect(isSafeWebsite('data:text/html,<script>')).toBe(false);
    expect(isSafeWebsite('/relative')).toBe(false);
  });
  it('rejects IDs and billing changes from profile forms', () => {
    expect(
      profileSchema.safeParse({ name: 'Alex', username: '', website: '', id: 'someone-else' })
        .success,
    ).toBe(false);
  });
});
