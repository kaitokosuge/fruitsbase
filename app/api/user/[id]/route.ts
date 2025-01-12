import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET({ id }: { id: string }) {
    const userData = await prisma.user.findFirst({
        where: {
            id: id,
        },
        include: {
            Quiz: {
                include: {
                    Option: true,
                    Category_Quiz: {
                        include: {
                            category: true,
                        },
                    },
                    author: true,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            },
            Category: true,
        },
    });
    if (userData === null) {
        return NextResponse.json({ quizzes: [] });
    }
    const quizzes = userData.Quiz;
    return NextResponse.json({ quizzes: quizzes });
}
