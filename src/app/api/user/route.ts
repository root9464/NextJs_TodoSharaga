import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Request = {
  id: number;
  firstName?: string;
  userName: string;
  lastName?: string;
  hash: string;
};

export async function POST(req: NextRequest) {
  const body: Request = await req.json();

  if (!body) return NextResponse.json({ message: 'User data is required' }, { status: 400 });

  const userInDb = await prisma.user.findUnique({
    where: { id: body.id },
  });

  if (!userInDb) {
    const newUser = await prisma.user.create({
      data: {
        id: body.id,
        name: body.userName,
        fisrtName: body.firstName,
        lastName: body.lastName,
        hash: body.hash,
      },
    });

    if (!newUser) return NextResponse.json({ status: 'error', message: 'User not created' }, { status: 400 });

    return NextResponse.json(
      {
        status: 'success',
        message: 'User created',
        data: {
          ...newUser,
          id: newUser.id.toString(),
        },
      },
      { status: 201 },
    );
  }

  const hasUserChanged = [userInDb.name !== body.userName, userInDb.fisrtName !== body.firstName, userInDb.lastName !== body.lastName].some(
    Boolean,
  );

  if (hasUserChanged) {
    const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: {
        name: body.userName,
        fisrtName: body.firstName,
        lastName: body.lastName,
        hash: body.hash,
      },
    });

    if (!updatedUser) return NextResponse.json({ status: 'error', message: 'User not updated' }, { status: 400 });

    return NextResponse.json(
      {
        status: 'success',
        message: 'User updated',
        data: {
          ...updatedUser,
          id: userInDb.id.toString(),
        },
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      status: 'success',
      message: 'Get user',
      data: {
        ...userInDb,
        id: userInDb.id.toString(),
      },
    },
    { status: 200 },
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = Number(searchParams.get('user_id'));

  if (!user_id) return NextResponse.json({ message: 'User id is required' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id: user_id } });

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json({ status: 'success', message: 'Get user', data: user }, { status: 200 });
}
