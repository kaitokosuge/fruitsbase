/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const headerToken = req.headers.get('token');
    console.log(headerToken);
    if (headerToken !== 'fruitsbase') {
        return;
    }

    const userId = (await params).id;

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page'));

    const rawQuizzes = await prisma.quiz.findMany({
        where: {
            authorId: userId,
        },
        skip: page * 10,
        take: 10,
        include: {
            Category_Quiz: {
                include: {
                    category: true,
                },
            },
            Option: true,
            author: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });
    //explanationとis_correctを除外
    const quizzes = rawQuizzes.map(({ explanation, Option, ...quizProp }) => ({
        ...quizProp,
        Option: Option.map(({ is_correct, ...optionProp }) => optionProp),
    }));
    const quizCount = await prisma.quiz.count({
        where: {
            authorId: userId,
        },
    });
    return NextResponse.json({ quizzes: quizzes, quizCount: quizCount });
}
