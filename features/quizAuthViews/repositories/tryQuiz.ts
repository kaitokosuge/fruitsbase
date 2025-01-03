export const tryQuiz = async (ids: string[], quizId: string) => {
    const res = await fetch('/api/quiz/try', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ selectedOptions: ids, quizId: quizId }),
    });
    if (res.ok) {
        const data: { result: string; quizId: string } = await res.json();
        return data;
    }
};
