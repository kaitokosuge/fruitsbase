import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    console.log('リクエストURL', req.url);
    const quizzes = await prisma.quiz.findMany({
        take: 2,
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
