export const tryQuiz = async (ids: string[], quizId: string) => {
    const isAnswer = confirm('解答しますか？');
    if (!isAnswer) {
        return;
    }
    const res = await fetch('/api/quiz/try', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ selectedOptions: ids, quizId: quizId }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
    }
};
