import React from 'react';
import { QuizOption } from '../../models/QuizOption';

export default function PostBtn({
    handleClickPost,
    questionText,
    selectedIds,
    options,
    explanationText,
    loading,
}: {
    handleClickPost: (
        questionText: string,
        selectedIds: string[],
        options: QuizOption[],
        explanationText: string,
    ) => void;
    questionText: string;
    selectedIds: string[];
    options: QuizOption[];
    explanationText: string;
    loading: boolean;
}) {
    return (
        <button
            onClick={() =>
                handleClickPost(
                    questionText,
                    selectedIds,
                    options,
                    explanationText,
                )
            }
            disabled={loading}
            className="md:text-[17px] text-xs ml-3 bg-[#333333] text-white px-3 md:py-3 py-1 block rounded-md font-bold hover:bg-blue-800 duration-200"
        >
            公開する
        </button>
    );
}
