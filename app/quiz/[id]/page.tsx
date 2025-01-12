import Header from '@/components/Header/Header';
import QuizShow from '@/features/quizShow/QuizShow';
import { Quiz } from '@/models/Quiz';
import React from 'react';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log('idです', id);
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`, {
        method: 'GET',
        // next: { revalidate: 20 },
    });
    if (!res.ok) {
        console.error(`API Error: ${res.status}`);
        const errorText = await res.text();
        console.error('Error body:', errorText);
    }
    const data: { quiz: Quiz } = await res.json();

    return (
        <div>
            <Header />
            <QuizShow quiz={data.quiz} />
        </div>
    );
}
