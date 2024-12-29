import React from 'react';
import { tryQuiz } from '../../repositories/tryQuiz';

export default function AnswerBtn({
    selectedOptionIds,
    quizId,
}: {
    selectedOptionIds: string[];
    quizId: string;
}) {
    return (
        <div>
            <button
                onClick={() => tryQuiz(selectedOptionIds, quizId)}
                className="bg-[#3333] text-white px-5 py-1 block rounded-md font-bold hover:bg-[#1d1d1d33] hover:text-black duration-200"
            >
                解答する
            </button>
        </div>
    );
}
