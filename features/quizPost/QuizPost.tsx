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
export type QuizOption = {
    text: string;
    is_correct: boolean;
    id: number;
};
export default function QuizPost() {
    const { inputExText, handleInputExChange } = useHandleInputExplanation();
    const { inputText, handleInputChange } = useHandleInputEditor();
    const {
        addOption,
        removeOption,
        handleOptionChange,
        handleChangeIsCorrect,
        options,
    } = useHandleOption();

    return (
        <div className="mt-10">
            <QuestionEditor
                id="question"
                placeholder="クイズ本文"
                handleInputChange={handleInputChange}
            />

            {options.map((option, index: number) => (
                <div key={option.id}>
                    <Option
                        options={options}
                        option={option}
                        index={index}
                        handleOptionChange={handleOptionChange}
                        handleChangeIsCorrect={handleChangeIsCorrect}
                        removeOption={removeOption}
                    />
                </div>
            ))}
            <div className="mx-auto w-[650px] flex justify-end">
                {options.length < 6 && (
                    <button
                        onClick={addOption}
                        className="block text-gray-500 bg-gray-800 px-2 py-1 rounded-md text-[13px]"
                    >
                        選択肢を追加する
                    </button>
                )}
            </div>

            <ExplanationEditor
                id="explanation"
                placeholder="クイズ解説"
                handleInputExChange={handleInputExChange}
            />
            <button>保存</button>
        </div>
    );
}
