import { Quiz } from '@/models/Quiz';
import { useState } from 'react';
import { getQuizByPaginateLimit } from '../../repositories/getQuizByPaginateLimit';

export const useGetQuizPaginateLimit = (quizzes: Quiz[]) => {
    const [viewQuizzes, setViewQuizzes] = useState<Quiz[]>(quizzes);
    const [getloading, setGetLoading] = useState(false);
    const [selectIndex, setSelectIndex] = useState(0);

    const handleClickPaginateIndex = async (
        paginateIndex: number,
        userId: string,
    ) => {
        setGetLoading(true);
        setSelectIndex(paginateIndex);
        const userQuizData = await getQuizByPaginateLimit(
            paginateIndex,
            userId,
        );
        if (!viewQuizzes) {
            return;
        }
        if (userQuizData) {
            setViewQuizzes(userQuizData.quizzes);
        } else {
            alert('取得に失敗しました:ho');
        }
        setGetLoading(false);
    };

    return { viewQuizzes, getloading, handleClickPaginateIndex, selectIndex };
};
