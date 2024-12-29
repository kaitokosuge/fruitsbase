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
                className="bg-[#333333] text-white px-5 py-1 block rounded-md font-bold hover:bg-blue-800 duration-200"
            >
                解答する
            </button>
        </div>
    );
}
