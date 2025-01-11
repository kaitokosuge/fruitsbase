import React from 'react';
import QuizViews from './QuizViews';
import { Quiz } from '@/models/Quiz';

export default async function QuizContainer() {
    const res = await fetch('https://www.fruitsbase.com/api/quiz', {
        method: 'GET',
        next: { revalidate: 60 },
    });
    const data: { quizzes: Quiz[] } = await res.json();
    return <QuizViews quizzes={data.quizzes} />;
}
