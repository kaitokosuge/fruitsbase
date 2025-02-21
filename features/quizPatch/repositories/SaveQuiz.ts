import { redirect } from 'next/navigation';
import { FeaturesOption } from '../models/FeaturesOption';

export const SaveQuiz = async (
    questionText: string,
    selectedIds: string[],
    options: FeaturesOption[],
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
        const data: {
            res: string;
            error: string | null;
            quizId: string;
            userId: string;
        } = await res.json();
        if (data.res === 'success') {
            redirect(`/quiz/${data.quizId}`);
        }
        return data;
    }
};
