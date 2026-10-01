import { describe, expect, it } from 'vitest';
import { DUMMY_PASSWORD_HASH, hashPassword, verifyPassword } from '@/lib/passwords';

describe('password hashing', () => {
  it('uses salted bcrypt hashes with cost 12 and verifies only the right password', async () => {
    const password = 'SyntheticPassword_123!';
    const first = await hashPassword(password);
    const second = await hashPassword(password);
    expect(first).not.toBe(password);
    expect(first).not.toBe(second);
    expect(first).toMatch(/^\$2[ab]\$12\$/);
    expect(await verifyPassword(password, first)).toBe(true);
    expect(await verifyPassword('WrongPassword_123!', first)).toBe(false);
  });
  it('has a valid dummy hash for unknown-account comparisons', async () => {
    expect(DUMMY_PASSWORD_HASH).toHaveLength(60);
    expect(await verifyPassword('SyntheticPassword_123!', DUMMY_PASSWORD_HASH)).toBe(false);
  });
});
