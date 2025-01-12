import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const quizzes = await prisma.quiz.findMany({
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
