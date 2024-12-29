/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './../../components/ui/drawer';
import Options from './components/Options/Options';
import { useTryQuiz } from './hooks/useTryQuiz/useTryQuiz';
import { formatDateToJST } from './utils/formatDateToJST/formatDateToJST';
import AnswerBtn from './components/AnswerBtn/AnswerBtn';
import CategoryArea from './components/CategoryArea/CategoryArea';

export default function QuizViews({ quizzes }: { quizzes: any }) {
    const { handleClickOption, selectedOptionIds } = useTryQuiz();

    const renderQuizzes = quizzes.map((quiz) => ({
        id: quiz.id,
        user: quiz.author,
        question: JSON.parse(quiz.question)[0].data.text,
        createdAt: formatDateToJST(quiz.createdAt),
        categories: quiz.Category_Quiz,
        options: quiz.Option,
    }));

    return (
        <div className="pb-20">
            <h2 className="text-xs text-gray-400">time line</h2>
            {renderQuizzes.map((quiz) => (
                <div key={quiz.id} className="mt-[15px]">
                    <Drawer>
                        <DrawerTrigger className="bg-[#292929] w-full text-left px-5 rounded-md flex justify-between items-center">
                            <div className="flex items-center w-[100%] overflow-scroll py-7">
                                <div>
                                    <div className="flex items-start absolute">
                                        <img
                                            src={quiz.user.image}
                                            alt="profile image"
                                            width={25}
                                            height={25}
                                            className="rounded-full"
                                        />
                                        <div className="ml-2">
                                            <p className="text-gray-400  text-[13px]">
                                                {quiz.user.username}
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                {quiz.createdAt}
                                            </p>
                                        </div>
                                        <div className="w-[40%] flex items-center ml-5">
                                            <CategoryArea quiz={quiz} />
                                        </div>
                                    </div>

                                    <p className="text-[20px] w-full text-white overflow-scroll whitespace-nowrap font-bold pt-10">
                                        {quiz.question}
                                    </p>
                                </div>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="min-h-[90%] max-h-[95%] md:px-10 bg-[#1c1c1c]">
                            <DrawerHeader className="xl:w-[80%] md:w-[95%] w-[100%] mx-auto overflow-y-scroll pb-20">
                                <DrawerTitle className="font-normal md:text-[22px] text-[16px] mt-10 text-left text-white">
                                    {quiz.question}
                                </DrawerTitle>
                                <DrawerDescription></DrawerDescription>

                                <div className="flex items-center justify-between">
                                    <CategoryArea quiz={quiz} />
                                    <AnswerBtn
                                        quizId={quiz.id}
                                        selectedOptionIds={selectedOptionIds}
                                    />
                                </div>
                                <Options
                                    quiz={quiz}
                                    handleClickOption={handleClickOption}
                                />
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose className="text-black">
                                    閉じる
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            ))}
        </div>
    );
}
