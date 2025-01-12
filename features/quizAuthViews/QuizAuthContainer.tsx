import React from 'react';
import QuizAuthViews from './QuizAuthViews';
import QuizViews from '../quizViews/QuizViews';
import { Quiz } from '@/models/Quiz';

export default async function QuizAuthContainer({
    paramId,
    authId,
}: {
    paramId: string;
    authId: string | null;
}) {
    const id = paramId;
    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'GET',
        next: { revalidate: 3 },
    });
    if (!res.ok) {
        console.error(`API Error: ${res.status}`);
        const errorText = await res.text();
        console.error('Error body:', errorText);
    }
    const data: { quizzes: Quiz[] } = await res.json();

    return (
        <div>
            {paramId === authId && paramId !== null && data.quizzes ? (
                <QuizAuthViews quizzes={data.quizzes} />
            ) : (
                <>{data.quizzes && <QuizViews quizzes={data.quizzes} />}</>
            )}
        </div>
    );
}
