import { useState } from 'react';
import { tryQuiz } from '../../repositories/tryQuiz';

export const useTry = () => {
    type QuizResult = {
        result: string;
        quizId: string;
    };
    const [loading, setLoading] = useState(false);
    const [quizResponse, setQuizResponse] = useState<QuizResult>({
        result: '',
        quizId: '',
    });

    const handleClickSubmit = async (
        selectedOptionIds: string[],
        quizId: string,
    ) => {
        const isAnswer = confirm('解答しますか？');
        if (!isAnswer) {
            return;
        }
        setLoading(true);
        const resultData = await tryQuiz(selectedOptionIds, quizId);
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);
        setLoading(false);

        if (resultData) {
            setQuizResponse(resultData);
        } else {
            alert('解答に失敗しました');
        }
    };
    return { handleClickSubmit, quizResponse, loading, setQuizResponse };
};
