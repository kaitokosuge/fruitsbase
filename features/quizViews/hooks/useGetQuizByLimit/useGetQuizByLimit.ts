import { useState } from 'react';
import { getQuizByLimit } from '../../repositories/getQuizByLimit';
import { Quiz } from '@/models/Quiz';

export const useGetQuizByLimit = (quizzes: Quiz[]) => {
    const [callNumber, setCallNumber] = useState(1);
    const [viewQuizzes, setViewQuizzes] = useState<Quiz[]>(quizzes);
    const [getloading, setLoading] = useState(false);
    const [isLoadable, setIsLoadable] = useState(true);

    const handleClickGetQuiz = async (callNum: number) => {
        setLoading(true);
        setCallNumber(callNumber + 1);
        const nextQuizzes = await getQuizByLimit(callNum);
        if (!viewQuizzes) {
            return;
        }
        console.log(nextQuizzes);
        if (nextQuizzes.length === 0) {
            setIsLoadable(false);
        }

        if (nextQuizzes) {
            setViewQuizzes([...viewQuizzes, ...nextQuizzes]);
        } else {
            alert('取得に失敗しました:ho');
        }

        setLoading(false);
    };

    return {
        viewQuizzes,
        callNumber,
        handleClickGetQuiz,
        getloading,
        isLoadable,
    };
};
