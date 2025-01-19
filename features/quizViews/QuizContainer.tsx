import React from 'react';
import QuizViews from './QuizViews';
import { PublicQuiz } from '@/models/PublicQuiz';

export default async function QuizContainer() {
    const res = await fetch(`${process.env.APP_URL}/api/quiz`, {
        method: 'GET',
        next: { revalidate: 60 },
        headers: {
            token: 'fruitsbase',
        },
    });
    const data: { quizzes: PublicQuiz[] } = await res.json();
    return <QuizViews quizzes={data.quizzes} />;
}
