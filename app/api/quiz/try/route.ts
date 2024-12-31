import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const triedQuiz = await prisma.quiz.findFirst({
        where: {
            id: data.quizId,
        },
        include: {
            Option: true,
        },
    });
    const trueIds = triedQuiz?.Option.filter((option) => option.is_correct).map(
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
    return NextResponse.json({ result: 'true', quizId: data.quizId });
}
