import 'server-only';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { getCurrentUser } from '@/lib/auth';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) throw new ApiError(403, 'A same-origin request is required.');
  let source: URL;
  try {
    source = new URL(origin);
  } catch {
    throw new ApiError(403, 'Invalid request origin.');
  }
  const requestUrl = new URL(request.url);
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    requestUrl.host;
  const protocol =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    requestUrl.protocol.replace(':', '');
  if (
    !['http:', 'https:'].includes(source.protocol) ||
    source.host !== host ||
    source.protocol !== `${protocol}:`
  ) {
    throw new ApiError(403, 'Cross-origin changes are not allowed.');
  }
}

export async function readJson(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    throw new ApiError(415, 'Send an application/json request.');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, 'A JSON request body is required.');
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16_384) {
      await reader.cancel();
      throw new ApiError(413, 'This request is too large.');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ApiError(400, 'Invalid JSON request.');
  }
}

export async function requireApiUser() {
  const user = await getCurrentUser();
  if (!user) throw new ApiError(401, 'Please sign in to continue.');
  return user;
}

export async function apiResponse(action: () => Promise<NextResponse>) {
  try {
    return await action();
  } catch (error) {
    if (error instanceof ApiError)
      return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof ZodError)
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Check your form values.' },
        { status: 400 },
      );
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return NextResponse.json(
          { error: 'That email or username is already in use.' },
          { status: 409 },
        );
      if (error.code === 'P2025')
        return NextResponse.json({ error: 'This item could not be found.' }, { status: 404 });
    }
    // Do not send SQL errors, connection strings, or stack traces to the browser.
    console.error('API operation failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
