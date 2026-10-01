import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

// A fixed bcrypt hash keeps unknown-account checks on the same expensive path.
export const DUMMY_PASSWORD_HASH = '$2b$12$C6UzMDM.H6dfI/f/IKcEe.3msFYxsAqsyxrP/M9VGJx1C3Jo2uBTK';
