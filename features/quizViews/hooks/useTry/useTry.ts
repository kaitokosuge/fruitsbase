import { useState } from 'react';
import { tryQuiz } from '../../repositories/tryQuiz';

export const useTry = () => {
    type QuizResult = {
        result: string;
        quizId: string;
        explanation: string;
    };
    const [loading, setLoading] = useState(false);
    const [quizResponse, setQuizResponse] = useState<QuizResult>({
        result: '',
        quizId: '',
        explanation: '',
    });

    const handleClickSubmit = async (
        selectedOptionIds: string[],
        quizId: string,
    ) => {
        setLoading(true);
        const resultData = await tryQuiz(selectedOptionIds, quizId);
        setLoading(false);

        if (resultData) {
            setQuizResponse(resultData);
        } else {
            alert('解答に失敗しました');
        }
    };
    return { handleClickSubmit, quizResponse, loading, setQuizResponse };
};
