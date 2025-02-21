import React from 'react';
import { FeaturesOption } from '../../models/FeaturesOption';

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
        options: FeaturesOption[],
        explanationText: string,
    ) => void;
    questionText: string;
    selectedIds: string[];
    options: FeaturesOption[];
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
