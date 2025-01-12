import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const quizId = req.url?.split('/').pop();
    const quiz = await prisma.quiz.findFirst({
        where: {
            id: quizId,
        },
        include: {
            Category_Quiz: {
                include: {
                    category: true,
                },
            },
            Option: true,
            author: true,
        },
    });
    return NextResponse.json({ quiz: quiz });
}
