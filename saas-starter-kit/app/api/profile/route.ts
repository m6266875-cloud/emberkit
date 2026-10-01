import { NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { profileSchema } from '@/lib/validation';
import { apiResponse, assertSameOrigin, readJson, requireApiUser } from '@/lib/http';

export const runtime = 'nodejs';
export async function PATCH(request: Request) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    const input = profileSchema.parse(await readJson(request));
    const profile = await database.user.update({
      where: { id: user.id },
      data: input,
      select: { id: true, name: true, email: true, username: true, website: true },
    });
    return NextResponse.json({ profile });
  });
}
