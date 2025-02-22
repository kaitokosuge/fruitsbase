import { redirect } from 'next/navigation';
import { FeaturesOption } from '../models/FeaturesOption';

export const PatchQuiz = async (
    editQuizId: string,
    questionText: string,
    selectedIds: string[],
    options: FeaturesOption[],
    explanationText: string,
) => {
    const res = await fetch(`/api/quiz/edit`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            quizId: editQuizId,
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
