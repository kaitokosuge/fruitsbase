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
    const quizzes = await prisma.quiz.findMany({
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
    return NextResponse.json({ quizzes: quizzes });
}
