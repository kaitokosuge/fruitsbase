import prisma from '@/lib/prisma';
import React from 'react';
import QuizViews from './QuizViews';

export default async function QuizContainer() {
    const delay = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    await delay(2000);
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
    });
    return <QuizViews quizzes={quizzes} />;
}
