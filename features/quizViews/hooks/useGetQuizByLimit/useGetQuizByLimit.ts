import { useState } from 'react';
import { getQuizByLimit } from '../../repositories/getQuizByLimit';
import { Quiz } from '@/models/Quiz';

export const useGetQuizByLimit = (quizzes: Quiz[]) => {
    const [callNumber, setCallNumber] = useState(2);
    const [viewQuizzes, setViewQuizzes] = useState<Quiz[]>();
    const [loading, setLoading] = useState(false);

    setViewQuizzes(quizzes);
    const handleClickGetQuiz = async (callNum: number) => {
        setLoading(true);
        setCallNumber(callNumber + 1);
        const nextQuizzes = await getQuizByLimit(callNum);
        if (!viewQuizzes) {
            return;
        }
        if (nextQuizzes) {
            setViewQuizzes([...viewQuizzes, ...nextQuizzes]);
        } else {
            alert('取得に失敗しました:ho');
        }

        setLoading(false);
    };
    return { viewQuizzes, handleClickGetQuiz, loading };
};
