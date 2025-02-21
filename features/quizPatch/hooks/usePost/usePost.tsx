import { useState } from 'react';
import { PatchQuiz } from '../../repositories/PatchQuiz';
import { FeaturesOption } from '../../models/FeaturesOption';

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
        questionText: string,
        selectedIds: string[],
        options: FeaturesOption[],
        explanationText: string,
    ) => {
        setLoading(true);
        const resultData = await PatchQuiz(
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
