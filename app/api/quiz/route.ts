import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    delay(2000);
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
