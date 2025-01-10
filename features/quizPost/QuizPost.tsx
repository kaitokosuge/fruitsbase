/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useHandleExplanation } from './hooks/useHandleExplanation/useHandleExplanation';
import { useHandleOption } from './hooks/useHandleOption/useHandleOption';
import { useHandleCategory } from './hooks/useHandleCategory/useHandleCategory';
import { useHandleQuestion } from './hooks/useHandleQuestion/useHandleQuestion';
// import Category from './components/Category/Category';
// import { SaveQuiz } from './repositories/SaveQuiz';
import { usePost } from './hooks/usePost/usePost';
import Link from 'next/link';

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

// {
//     categories,
// }: {
//     categories: {
//         id: string;
//         name: string;
//         color: string | null;
//         svg: string | null;
//         authorId: string;
//         createdAt: Date;
//         updatedAt: Date;
//     }[];
// }

export default function QuizPost() {
    const { questionText, handleInputChange } = useHandleQuestion();
    const { explanationText, handleInputExChange } = useHandleExplanation();
    const {
        addOption,
        removeOption,
        handleOptionChange,
        handleChangeIsCorrect,
        options,
    } = useHandleOption();
    const { selectedIds } = useHandleCategory();
    // const { selectedIds, handleClickCategory } = useHandleCategory();
    const { loading, postResponse, handleClickAnswer } = usePost();

    return (
        <div className="">
            <div className="border-b border-[#2c2c2c] fixed w-full bg-[#171717] z-[99]">
                <div className="flex justify-between items-center mx-auto w-[90%] py-2">
                    <Link href="/">
                        <h1 className="flex items-center">
                            <img
                                src="/fruitsbase-logo.png"
                                alt="Fruitsbase"
                                className="md:w-[120px] w-[70px] block"
                            />
                        </h1>
                    </Link>

                    <div className="flex items-center">
                        <p className="md:text-xs md:block hidden text-[#6a6a6a]">
                            知識をアウトプットしよう！
                        </p>
                        {/* <button className="ml-3 md:text-[17px] text-xs bg-[#333333] text-white px-3 md:py-3 py-1 block rounded-md font-bold hover:bg-blue-950 duration-200">
                            プレビュー
                        </button> */}
                        <button
                            onClick={() =>
                                handleClickAnswer(
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
                    </div>
                </div>
            </div>
            {/* <Category
                selectedIds={selectedIds}
                categories={categories}
                handleClickCategory={handleClickCategory}
            /> */}
            <div className="md:pt-[80px] pt-[55px]"></div>
            {postResponse && (
                <div className="sm:w-[650px] w-[350px] mx-auto pb-1">
                    {postResponse.error === 'quizText' && (
                        <p className="text-red-800  text-xs">
                            クイズの本文を入力してください
                        </p>
                    )}
                </div>
            )}
            {postResponse && (
                <div className="sm:w-[650px] w-[350px] mx-auto pb-1">
                    {postResponse.error === 'quizTextCode' && (
                        <p className="text-red-800  text-xs">
                            未入力のコードブロックがあります
                        </p>
                    )}
                </div>
            )}
            <QuestionEditor
                id="question"
                placeholder="クイズ本文"
                handleInputChange={handleInputChange}
            />
            {postResponse && (
                <div className="sm:w-[650px] w-[350px] mx-auto">
                    {postResponse.error === 'option' && (
                        <p className="text-red-800  text-xs">
                            選択肢は少なくとも一つは◎になるようにクイズを作成してください
                        </p>
                    )}
                </div>
            )}
            {postResponse && (
                <div className="sm:w-[650px] w-[350px] mx-auto">
                    {postResponse.error === 'optionCode' && (
                        <p className="text-red-800  text-xs">
                            未入力のコードブロックがあります
                        </p>
                    )}
                </div>
            )}
            {postResponse && (
                <div className="sm:w-[650px] w-[350px] mx-auto">
                    {postResponse.error === 'optionText' && (
                        <p className="text-red-800  text-xs">
                            選択肢の文章を入力してください
                        </p>
                    )}
                </div>
            )}
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
            <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px] flex justify-end">
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
