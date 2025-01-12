import React from 'react';

export default function GetMoreQuizBtn({
    callNumber,
    handleClickGetQuiz,
}: {
    callNumber: number;
    handleClickGetQuiz: (callNum: number) => void;
}) {
    return <button onClick={() => handleClickGetQuiz(callNumber)}>more</button>;
}
