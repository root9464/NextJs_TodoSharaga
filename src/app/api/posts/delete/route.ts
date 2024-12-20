import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Request = {
  postId: string;
};

export async function POST(req: NextRequest) {
  const body: Request = await req.json();

  if (!body) return NextResponse.json({ message: 'Post data is required' }, { status: 400 });

  const postInDb = await prisma.task.findUnique({
    where: {
      id: body.postId,
    },
  });

  if (!postInDb) return NextResponse.json({ status: 'error', message: 'Post not found' }, { status: 404 });

  const deletedPost = await prisma.task.delete({
    where: {
      id: body.postId,
    },
  });

  if (!deletedPost) return NextResponse.json({ status: 'error', message: 'Post not deleted' }, { status: 400 });

  return NextResponse.json({ status: 'success', message: 'Post deleted', data: deletedPost }, { status: 200 });
}
