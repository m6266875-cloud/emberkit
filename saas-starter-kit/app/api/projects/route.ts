import { NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { projectSchema } from '@/lib/validation';
import { serializeProject } from '@/lib/projects';
import { apiResponse, assertSameOrigin, readJson, requireApiUser } from '@/lib/http';

export const runtime = 'nodejs';
export async function GET() {
  return apiResponse(async () => {
    const user = await requireApiUser();
    const projects = await database.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(
      { projects: projects.map(serializeProject) },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  });
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    assertSameOrigin(request);
    const user = await requireApiUser();
    const input = projectSchema.parse(await readJson(request));
    const project = await database.project.create({ data: { ...input, userId: user.id } });
    return NextResponse.json({ project: serializeProject(project) }, { status: 201 });
  });
}
