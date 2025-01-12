import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.url?.split('/').pop();
    console.log('ユーザーID', userId);
    const userData = await prisma.user.findFirst({
        where: {
            id: userId,
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
