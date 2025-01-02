import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const data = await req.json();

    const quizDeleteRes = await prisma.quiz.delete({
        where: {
            id: data.quizId,
        },
    });
    console.log('クイズ削除結果', quizDeleteRes);
    return NextResponse.json({ result: 'success' });
}
