import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
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
    const postUser = await prisma.user.findUnique({
        where: { id: userId },
    });
    revalidatePath(`/profile/${postUser?.name}`);
    console.log('クイズ削除結果', quizDeleteRes);
    return NextResponse.json({ result: 'success' });
}
