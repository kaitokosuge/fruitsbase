import { redirect } from 'next/navigation';

export const deleteQuiz = async (quizId: string) => {
    const res = await fetch('/api/quiz/delete', {
        method: 'DELETE',
        body: JSON.stringify({ quizId: quizId }),
    });
    if (res.ok) {
        return redirect(`/`);
    }
};
