import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const data = await req.json();
    console.log(data);
    const isValidId = (name: string): boolean => {
        return /^[a-zA-Z0-9_-]{3,30}$/.test(name);
    };
    if (!isValidId(data.name)) {
        return NextResponse.json({ error: '無効なIDです' }, { status: 400 });
    }
    const nameCount = (value: string) => {
        return value.length > 40;
    };
    const bioCount = (value: string) => {
        return value.length > 200;
    };
    const userNameCount = (value: string) => {
        return value.length > 20;
    };
    if (
        nameCount(data.name) ||
        bioCount(data.bio) ||
        userNameCount(data.username)
    ) {
        return NextResponse.json({ error: '字数超過です' }, { status: 400 });
    }
    const userNewName = await prisma.user.update({
        where: { id: userId },
        data: {
            username: data.username,
            bio: data.bio,
            name: `${data.name}`,
        },
    });
    revalidatePath(`/profile/setting`);
    revalidatePath(`/`);
    revalidatePath(`/profile/${userNewName.name}`);
    return NextResponse.json(userNewName);
}
