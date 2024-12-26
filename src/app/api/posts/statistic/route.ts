import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = String(searchParams.get('user_id'));

  if (!user_id) return NextResponse.json({ message: 'User id is required' }, { status: 400 });

  const posts = await prisma.task.findMany({
    where: {
      userId: user_id,
    },
  });

  if (!posts) return NextResponse.json({ message: 'Posts not found' }, { status: 404 });

  const totalDone = posts.filter((post) => post.done).length;

  return NextResponse.json({ status: 'success', message: 'Get posts', data: { total: posts.length, totalDone } }, { status: 200 });
}
