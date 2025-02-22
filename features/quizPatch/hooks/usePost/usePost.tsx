import { useState } from 'react';
import { PatchQuiz } from '../../repositories/PatchQuiz';
import { FeaturesEditOption } from '../../models/FeaturesEditOption';

export const usePost = () => {
    type PostResult = {
        res: string;
        error: string | null;
    };
    const [loading, setLoading] = useState(false);
    const [postResponse, setPostResponse] = useState<PostResult>({
        res: '',
        error: '',
    });
    const handleClickPost = async (
        editQuizId: string,
        questionText: string,
        selectedIds: string[],
        options: FeaturesEditOption[],
        explanationText: string,
    ) => {
        setLoading(true);
        const resultData = await PatchQuiz(
            editQuizId,
            questionText,
            selectedIds,
            options,
            explanationText,
        );
        setLoading(false);
        if (resultData) {
            setPostResponse(resultData);
        } else {
            alert('投稿に失敗しました');
        }
    };
    return { loading, postResponse, handleClickPost };
};
