import { useState } from 'react';
import { getQuizByLimit } from '../../repositories/getQuizByLimit';
import { PublicQuiz } from '@/models/PublicQuiz';

export const useGetQuizByLimit = (quizzes: PublicQuiz[]) => {
    const [callNumber, setCallNumber] = useState(1);
    const [viewQuizzes, setViewQuizzes] = useState<PublicQuiz[]>(quizzes);
    const [getloading, setLoading] = useState(false);
    const [isLoadable, setIsLoadable] = useState(true);

    const handleClickGetQuiz = async (callNum: number) => {
        setLoading(true);
        setCallNumber(callNumber + 1);
        const nextQuizzes = await getQuizByLimit(callNum);
        if (!viewQuizzes) {
            return;
        }
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
