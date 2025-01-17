import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    const data: { quizId: string; selectedOptions: string[] } =
        await req.json();

    const triedQuiz = await prisma.quiz.findFirst({
        where: {
            id: data.quizId,
        },
        include: {
            Option: true,
        },
    });
    if (!triedQuiz) {
        return;
    }
    const trueIds = triedQuiz.Option.filter((option) => option.is_correct).map(
        (option) => option.id,
    );

    if (!trueIds) {
        return NextResponse.json({ result: 'false', quizId: data.quizId });
    }

    if (trueIds.length !== data.selectedOptions.length) {
        return NextResponse.json({ result: 'false', quizId: data.quizId });
    }

    const sortedTrueIds = trueIds.sort();
    const sortedSelectedIds = data.selectedOptions.sort();

    const isEqual = sortedTrueIds.every(
        (trueId, index) => trueId === sortedSelectedIds[index],
    );
    if (!isEqual) {
        return NextResponse.json({ result: 'false', quizId: data.quizId });
    }
    console.log('正解したか', isEqual);
    if (userId) {
        const attemptUser = await prisma.user_Attempt.create({
            data: {
                userId: userId,
                quizId: data.quizId,
            },
        });
        console.log('回答しました', attemptUser);
        if (isEqual) {
            const isExist = await prisma.user_Correct.findUnique({
                where: {
                    quizId_userId: { quizId: data.quizId, userId: userId },
                },
            });
            console.log('正解したことがあるか', isExist);
            if (isExist) {
                return NextResponse.json({
                    result: 'true',
                    quizId: data.quizId,
                });
            }
            console.log('ここまで処理は通る');
            console.log('IDども', userId, data.quizId);
            const correctUser = await prisma.user_Correct.create({
                data: {
                    userId: userId,
                    quizId: data.quizId,
                },
            });
            console.log('データが保存されました:', correctUser);
        }
    }
    return NextResponse.json({
        result: 'true',
        quizId: data.quizId,
        explanation: triedQuiz.explanation,
    });
}
