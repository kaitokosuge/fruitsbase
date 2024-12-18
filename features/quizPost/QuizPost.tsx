'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useHandleInputExplanation } from './hooks/useHandleInputExplanation/useHandleInputExplanation';
import { useHandleInputEditor } from './hooks/useHandleInputEditor/useHandleInputEditor';
import { useHandleOption } from './hooks/useHandleOption/useHandleOption';
const QuestionEditor = dynamic(
    () => import('./components/Editor/QuestionEditor'),
    {
        ssr: false,
    },
);
const ExplanationEditor = dynamic(
    () => import('./components/Editor/ExplanationEditor'),
    {
        ssr: false,
    },
);

const Option = dynamic(() => import('./components/Options/Option'), {
    ssr: false,
});

export default function QuizPost() {
    const { inputExText, handleInputExChange } = useHandleInputExplanation();
    const { inputText, handleInputChange } = useHandleInputEditor();
    const { optionText, handleOptionChange } = useHandleOption();
    console.log('qu', JSON.parse(inputText));
    console.log('ex', JSON.parse(inputExText));
    console.log('op', optionText);

    const options: { text: string; is_correct: boolean; id: number }[] = [
        { text: 'string', is_correct: false, id: 1 },
        { text: 'string', is_correct: false, id: 3 },
    ];
    // const addOption = () => {};
    // const removeOption = () => {};
    return (
        <div className="mt-10">
            <QuestionEditor
                id="question"
                placeholder="クイズ本文"
                handleInputChange={handleInputChange}
            />
            {options.map((option, index: number) => (
                <div key={index}>
                    <Option
                        optionId={option.id}
                        index={index}
                        handleOptionChange={handleOptionChange}
                    />
                </div>
            ))}
            {options.length < 6 && <button>選択肢を追加する</button>}

            <ExplanationEditor
                id="explanation"
                placeholder="クイズ解説"
                handleInputExChange={handleInputExChange}
            />
            <button>保存</button>
        </div>
    );
}
