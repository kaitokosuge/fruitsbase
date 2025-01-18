import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const data: { quizId: string } = await req.json();

    const checkQuiz = await prisma.quiz.findFirst({
        where: {
            id: data.quizId,
        },
    });

    //存在しなかったらreturn。returnするだけでいい？
    if (!checkQuiz) {
        return;
    }
    //ユーザーIDが異なったらreturn。returnするだけでいい？
    if (checkQuiz.authorId !== userId) {
        return;
    }

    const quizDeleteRes = await prisma.quiz.delete({
        where: {
            id: data.quizId,
        },
    });
    console.log('クイズ削除結果', quizDeleteRes);
    return NextResponse.json({ result: 'success' });
}
