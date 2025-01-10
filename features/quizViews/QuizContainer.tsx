import prisma from '@/lib/prisma';
import React from 'react';
import QuizViews from './QuizViews';

export default async function QuizContainer() {
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
    return <QuizViews quizzes={quizzes} />;
}
