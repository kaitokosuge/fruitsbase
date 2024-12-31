import React from 'react';

export default function AnswerBtn({
    selectedOptionIds,
    quizId,
    loading,
    handleClickSubmit,
}: {
    selectedOptionIds: string[];
    quizId: string;
    loading: boolean;
    handleClickSubmit: (selectedOptionIds: string[], quizId: string) => void;
}) {
    return (
        <div>
            <button
                disabled={loading}
                onClick={() => handleClickSubmit(selectedOptionIds, quizId)}
                className="ml-3 bg-[#333333] text-white px-5 py-1 block rounded-md font-bold opacity-40 hover:opacity-100 duration-200"
            >
                解答する
            </button>
        </div>
    );
}
