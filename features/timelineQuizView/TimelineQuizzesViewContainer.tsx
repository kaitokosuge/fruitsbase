import React from 'react';
import QuizViews from './QuizViews';
import { PublicQuiz } from '@/models/PublicQuiz';

export default async function TimelineQuizzesViewContainer() {
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
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
