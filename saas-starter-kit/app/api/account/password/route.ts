import { NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/passwords';
import { passwordChangeSchema } from '@/lib/validation';
import { consumeRateLimit } from '@/lib/rate-limit';
import { apiResponse, ApiError, assertSameOrigin, readJson, requireApiUser } from '@/lib/http';

export const runtime = 'nodejs';
export async function PATCH(request: Request) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    const input = passwordChangeSchema.parse(await readJson(request));
    const limit = await consumeRateLimit(`password:${user.id}`, 10, 15 * 60 * 1000);
    if (!limit.allowed) throw new ApiError(429, 'Too many attempts. Please try again later.');
    const account = await database.user.findUniqueOrThrow({
      where: { id: user.id },
      select: { passwordHash: true, authVersion: true },
    });
    if (!(await verifyPassword(input.currentPassword, account.passwordHash)))
      throw new ApiError(400, 'Your current password is incorrect.');
    const passwordHash = await hashPassword(input.newPassword);
    await database.user.update({
      where: { id: user.id, authVersion: account.authVersion },
      data: { passwordHash, authVersion: { increment: 1 } },
    });
    return NextResponse.json({ changed: true });
  });
}
