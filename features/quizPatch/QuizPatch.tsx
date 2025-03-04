/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import { useHandleCategory } from './hooks/useHandleCategory/useHandleCategory';

// import Category from './components/Category/Category';
// import { SaveQuiz } from './repositories/SaveQuiz';
import { usePost } from './hooks/usePost/usePost';
import Link from 'next/link';
import PostBtn from './components/PostBtn/PostBtn';
import { useHandleEditQuestion } from './hooks/useHandleEditQuestion/useHandleEditQuestion';
import { useHandleEditExplanation } from './hooks/useHandleEditExplanation/useHandleEditExplanation';
import { Quiz } from '@/models/Quiz';
import { useHandleEditOption } from './hooks/useHandleEditOption/useHandleEditOption';

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

export default function QuizPatch({ editQuiz }: { editQuiz: Quiz }) {
    console.log(editQuiz.Option);
    const { questionText, handleInputChange } = useHandleEditQuestion(
        editQuiz.question,
    );

    const { explanationText, handleInputExChange } = useHandleEditExplanation(
        editQuiz.explanation,
    );

    const { handleOptionChange, handleChangeIsCorrect, options } =
        useHandleEditOption(editQuiz.Option);

    const { selectedIds } = useHandleCategory();
    // const { selectedIds, handleClickCategory } = useHandleCategory();
    const { loading, postResponse, handleClickPost } = usePost();

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
                        <p className="md:text-xs md:block hidden text-[#d5d5d5] ml-2">
                            （編集）
                        </p>
                        <p className="md:text-xs md:block hidden text-[#6a6a6a] ml-2">
                            知識をアウトプットしよう！
                        </p>
                        {loading && (
                            <div className="spinner-box ml-1">
                                <div className="circle-border">
                                    <div className="circle-core"></div>
                                </div>
                            </div>
                        )}
                        {/* <button className="ml-3 md:text-[17px] text-xs bg-[#333333] text-white px-3 md:py-3 py-1 block rounded-md font-bold hover:bg-blue-950 duration-200">
                            プレビュー
                        </button> */}
                        <PostBtn
                            handleClickPost={handleClickPost}
                            editQuizId={editQuiz.id}
                            questionText={questionText}
                            selectedIds={selectedIds}
                            options={options}
                            explanationText={explanationText}
                            loading={loading}
                        />
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
                id="editQuestion"
                placeholder="クイズ本文"
                handleInputChange={handleInputChange}
                currentQuestionText={editQuiz.question}
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
                    />
                </div>
            ))}

            <ExplanationEditor
                id="explanation"
                placeholder="クイズ解説"
                handleInputExChange={handleInputExChange}
                currentExplanationText={editQuiz.explanation}
            />
        </div>
    );
}
