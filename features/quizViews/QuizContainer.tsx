import prisma from '@/lib/prisma';
import React from 'react';
import QuizViews from './QuizViews';

export default async function QuizContainer() {
    const res = await fetch('http://localhost:3000/api/test', {
        method: 'GET',
        next: { revalidate: 15 },
    });
    const data = await res.json();
    console.log('json placeholderから取得', data);

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
