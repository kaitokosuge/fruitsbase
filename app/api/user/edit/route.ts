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
    const userNewName = await prisma.user.update({
        where: { id: userId },
        data: {
            username: data.username,
            bio: data.bio,
            name: `${data.name}`,
        },
    });
    revalidatePath(`/profile/${userId}/setting`);
    return NextResponse.json(userNewName);
}
