/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const headerToken = req.headers.get('token');
    console.log(headerToken);
    if (headerToken !== 'fruitsbase') {
        return;
    }
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page'));
    console.log('リクエストURL page', page);
    const rawQuizzes = await prisma.quiz.findMany({
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
            createdAt: 'desc',
        },
    });
    const quizzes = rawQuizzes.map(({ explanation, Option, ...quizProp }) => ({
        ...quizProp,
        Option: Option.map(({ is_correct, ...optionProp }) => optionProp),
    }));
    return NextResponse.json({ quizzes: quizzes });
}
