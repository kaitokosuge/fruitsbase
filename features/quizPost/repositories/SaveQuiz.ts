import { redirect } from 'next/navigation';
import { QuizOption } from '../models/QuizOption';

export const SaveQuiz = async (
    questionText: string,
    selectedIds: string[],
    options: QuizOption[],
    explanationText: string,
) => {
    const res = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            question: questionText,
            explanation: explanationText,
            options: options,
            categories: selectedIds,
        }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log('data!', data);
        redirect('/');
    }
};
