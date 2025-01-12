import React from 'react';

export default function GetMoreQuizBtn({
    callNumber,
    handleClickGetQuiz,
    isLoadable,
}: {
    callNumber: number;
    handleClickGetQuiz: (callNum: number) => void;
    isLoadable: boolean;
}) {
    return (
        <button
            disabled={!isLoadable}
            onClick={() => handleClickGetQuiz(callNumber)}
            className="text-xs text-gray-300 hover:opacity-50 duration-200 block mt-5 w-[200px] p-3 border border-[#4b4b4b] rounded-[10px] mx-auto"
        >
            もっと見る
        </button>
    );
}
