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
import { useOption } from './hooks/useOption/useOption';
import { formatDateToJST } from './utils/formatDateToJST/formatDateToJST';
import AnswerBtn from './components/AnswerBtn/AnswerBtn';
import CategoryArea from './components/CategoryArea/CategoryArea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTry } from './hooks/useTry/useTry';

export default function QuizViews({ quizzes }: { quizzes: any }) {
    const { handleClickOption, selectedOptionIds } = useOption();
    const { handleClickSubmit, quizResponse, loading } = useTry();

    const renderQuizzes = quizzes.map((quiz) => ({
        id: quiz.id,
        user: quiz.author,
        question: quiz.question,
        createdAt: formatDateToJST(quiz.createdAt),
        categories: quiz.Category_Quiz,
        options: quiz.Option,
    }));

    return (
        <div className="pb-20">
            <h2 className="text-xs text-gray-400">time line</h2>
            {renderQuizzes.map((quiz) => (
                <div key={quiz.id} className="mt-[10px]">
                    <Drawer>
                        <DrawerTrigger className="bg-[#292929] w-full text-left px-5 rounded-md flex justify-between items-center">
                            <div className="flex items-center w-[100%] py-7 overflow-hidden">
                                <div>
                                    <div className="w-full overflow-hidden flex items-center justify-between">
                                        <div className="flex items-start">
                                            <img
                                                src={quiz.user.image}
                                                alt="profile image"
                                                width={25}
                                                height={25}
                                                className="rounded-full"
                                            />
                                            <div className="ml-2">
                                                <p className="text-gray-400 text-[13px]">
                                                    {quiz.user.username}
                                                </p>
                                                <p className="text-[10px] text-gray-500">
                                                    {quiz.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[17px] w-full whitespace-nowrap overflow-x-scroll font-bold pt-5">
                                        <p className="w-fit">
                                            {
                                                JSON.parse(quiz.question)[0]
                                                    .data.text
                                            }
                                        </p>
                                    </div>
                                    <div className="flex overflow-x-scroll items-center w-full mt-3">
                                        <CategoryArea quiz={quiz} />
                                    </div>
                                </div>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="md:min-h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] md:px-10 bg-[#131313]">
                            <DrawerHeader className="pb-20 xl:w-[80%] md:w-[95%] w-[100%] mx-auto overflow-y-scroll">
                                <div className="md:mt-5 mt-0 flex md:justify-end justify-around">
                                    {quiz.id === quizResponse.quizId &&
                                        quizResponse.result === 'true' &&
                                        !loading && (
                                            <div className="text-emerald-500 md:text-xl text-[15px] font-bold ">
                                                <p>正解です！</p>
                                            </div>
                                        )}
                                    {quiz.id === quizResponse.quizId &&
                                        quizResponse.result === 'false' &&
                                        !loading && (
                                            <div className="text-red-400 md:text-[18px] text-[15px] font-bold">
                                                <p>不正解です</p>
                                            </div>
                                        )}
                                </div>

                                <div className="flex items-center justify-between md:mt-5 mt-3">
                                    <div className="w-[180px] md:w-[400px]">
                                        <CategoryArea quiz={quiz} />
                                    </div>
                                    <div className="flex items-center">
                                        {loading && (
                                            <div className="spinner-box">
                                                <div className="circle-border">
                                                    <div className="circle-core"></div>
                                                </div>
                                            </div>
                                        )}
                                        <AnswerBtn
                                            handleClickSubmit={
                                                handleClickSubmit
                                            }
                                            loading={loading}
                                            quizId={quiz.id}
                                            selectedOptionIds={
                                                selectedOptionIds
                                            }
                                        />
                                    </div>
                                </div>
                                <DrawerTitle className="hidden">
                                    question
                                </DrawerTitle>
                                <div className="font-normal md:text-[18px] text-[16px] text-left max-w-full">
                                    {JSON.parse(quiz.question).map((item) => (
                                        <div
                                            key={item.id}
                                            className="max-w-full"
                                        >
                                            {'code' in item.data ? (
                                                <div className="text-[13px] mt-4 md:w-full w-[340px] mx-auto">
                                                    <SyntaxHighlighter
                                                        language="typescript"
                                                        style={atomOneDark}
                                                    >
                                                        {item.data.code}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <div className="mt-4">
                                                    {item.data.text}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <DrawerDescription></DrawerDescription>

                                <Options
                                    result={quizResponse}
                                    selectedOptionIds={selectedOptionIds}
                                    quiz={quiz}
                                    handleClickOption={handleClickOption}
                                />
                            </DrawerHeader>
                            <DrawerFooter className="flex items-center">
                                <DrawerClose className="text-[10px] text-gray-600 hover:text-white duration-300 border border-[#1c1c1c] w-[10%] py-2 rounded-md">
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
