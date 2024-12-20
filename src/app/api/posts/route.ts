import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Request = {
  userId: number;
  title: string;
  description: string;
  done: boolean;
};

export async function POST(req: NextRequest) {
  const body: Request = await req.json();

  if (!body) return NextResponse.json({ message: 'Post data is required' }, { status: 400 });

  const postInDb = await prisma.task.findFirst({
    where: {
      userId: body.userId,
      title: body.title,
    },
  });

  if (!postInDb) {
    const newPost = await prisma.task.create({
      data: {
        userId: body.userId,
        title: body.title,
        description: body.description,
        done: body.done,
      },
    });

    if (!newPost) return NextResponse.json({ status: 'error', message: 'Post not created' }, { status: 400 });

    return NextResponse.json({ status: 'success', message: 'Post created', data: newPost }, { status: 201 });
  }

  const hasUserChanged = [postInDb.title !== body.title, postInDb.description !== body.description, postInDb.done !== body.done].some(Boolean);

  if (hasUserChanged) {
    const updatedPost = await prisma.task.update({
      where: {
        id: postInDb.id,
      },
      data: {
        title: body.title,
        description: body.description,
        done: body.done,
      },
    });

    if (!updatedPost) return NextResponse.json({ status: 'error', message: 'Post not updated' }, { status: 400 });

    return NextResponse.json({ status: 'success', message: 'Post updated', data: updatedPost }, { status: 200 });
  }

  return NextResponse.json({ status: 'success', message: 'Get post', data: postInDb }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('user_id'));

  if (!user_id) return NextResponse.json({ message: 'User id is required' }, { status: 400 });

  const posts = await prisma.task.findMany({
    where: {
      userId: user_id,
    },
  });

  if (!posts) return NextResponse.json({ message: 'Posts not found' }, { status: 404 });

  return NextResponse.json({ status: 'success', message: 'Get posts', data: posts }, { status: 200 });
}
