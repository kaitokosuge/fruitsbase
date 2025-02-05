import React from 'react';

export default function AnswerBtn({
    selectedOptionIds,
    quizId,
    loading,
    handleClickSubmit,
    isTrue,
}: {
    selectedOptionIds: string[];
    quizId: string;
    loading: boolean;
    handleClickSubmit: (selectedOptionIds: string[], quizId: string) => void;
    isTrue: string;
}) {
    return (
        <div>
            <button
                disabled={loading}
                onClick={() => {
                    if (isTrue === 'true') {
                        return;
                    }
                    if (selectedOptionIds.length === 0) {
                        alert('選択肢は最低1つ選んでください');
                        return;
                    }
                    handleClickSubmit(selectedOptionIds, quizId);
                }}
                className="border-t border-t-[#494949] ml-3 bg-[#333333] text-white px-5 py-1 block rounded-md font-bold opacity-40 hover:opacity-100 duration-200"
            >
                解答する
            </button>
        </div>
    );
}
