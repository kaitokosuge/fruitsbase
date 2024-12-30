'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useHandleExplanation } from './hooks/useHandleExplanation/useHandleExplanation';
import { useHandleOption } from './hooks/useHandleOption/useHandleOption';
import Category from './components/Category/Category';
import { useHandleCategory } from './hooks/useHandleCategory/useHandleCategory';
import { useHandleQuestion } from './hooks/useHandleQuestion/useHandleQuestion';
import { SaveQuiz } from './repositories/SaveQuiz';

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

export default function QuizPost({
    categories,
}: {
    categories: {
        id: string;
        name: string;
        color: string | null;
        svg: string | null;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}) {
    const { questionText, handleInputChange } = useHandleQuestion();
    const { explanationText, handleInputExChange } = useHandleExplanation();
    const {
        addOption,
        removeOption,
        handleOptionChange,
        handleChangeIsCorrect,
        options,
    } = useHandleOption();
    const { selectedIds, handleClickCategory } = useHandleCategory();

    return (
        <div className="mt-10 pb-10">
            <div className="w-[670px] mx-auto flex items-center justify-between">
                <p className="text-xs text-[#6a6a6a]">
                    知識をアウトプットしよう！
                </p>
                <div className="flex items-center">
                    <button className="bg-[#333333] text-white px-5 py-1 block rounded-md font-bold hover:bg-blue-950 duration-200">
                        プレビュー
                    </button>
                    <button
                        onClick={() =>
                            SaveQuiz(
                                questionText,
                                selectedIds,
                                options,
                                explanationText,
                            )
                        }
                        className="ml-3 bg-[#333333] text-white px-5 py-1 block rounded-md font-bold hover:bg-blue-800 duration-200"
                    >
                        公開する
                    </button>
                </div>
            </div>

            <Category
                selectedIds={selectedIds}
                categories={categories}
                handleClickCategory={handleClickCategory}
            />
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
                        className="block text-gray-500 bg-[#333333] px-2 py-1 rounded-md text-[13px] hover:text-white duration-300"
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
        </div>
    );
}
