import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const headerToken = req.headers.get('token');
    console.log(headerToken);
    if (headerToken !== 'fruitsbase') {
        return;
    }
    const userId = params.id;
    console.log('ユーザーid', userId);
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) - 1;
    console.log(page);
    const quizzes = await prisma.quiz.findMany({
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

    const quizCount = await prisma.quiz.count({
        where: {
            authorId: userId,
        },
    });
    return NextResponse.json({ quizzes: quizzes, quizCount: quizCount });
}
