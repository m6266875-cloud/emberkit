import { NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { projectIdSchema, projectSchema } from '@/lib/validation';
import { serializeProject } from '@/lib/projects';
import { apiResponse, ApiError, assertSameOrigin, readJson, requireApiUser } from '@/lib/http';

type Context = { params: Promise<{ id: string }> };
export const runtime = 'nodejs';

export async function GET(_request: Request, context: Context) {
  return apiResponse(async () => {
    const user = await requireApiUser();
    const id = projectIdSchema.parse((await context.params).id);
    const project = await database.project.findFirst({ where: { id, userId: user.id } });
    if (!project) throw new ApiError(404, 'Project not found.');
    return NextResponse.json(
      { project: serializeProject(project) },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  });
}

export async function PATCH(request: Request, context: Context) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    const id = projectIdSchema.parse((await context.params).id);
    const input = projectSchema.parse(await readJson(request));
    const project = await database.project.update({ where: { id, userId: user.id }, data: input });
    return NextResponse.json({ project: serializeProject(project) });
  });
}

export async function DELETE(request: Request, context: Context) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    const id = projectIdSchema.parse((await context.params).id);
    const result = await database.project.deleteMany({ where: { id, userId: user.id } });
    if (!result.count) throw new ApiError(404, 'Project not found.');
    return NextResponse.json({ deleted: true });
  });
}
