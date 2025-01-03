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
import Link from 'next/link';
import { deleteQuiz } from './repositories/deleteQuiz';
import { Quiz } from '@/models/Quiz';

export default function QuizAuthViews({ quizzes }: { quizzes: Quiz[] }) {
    const { handleClickOption, selectedOptionIds } = useOption();
    const { handleClickSubmit, quizResponse, loading } = useTry();

    return (
        <div className="pb-20">
            {/* <h2 className="text-xs text-gray-400">time line</h2> */}
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="mt-[10px]">
                    <Drawer>
                        <DrawerTrigger className="mt-1 bg-[#292929] w-full text-left px-5 rounded-md flex justify-between items-center">
                            <div className="w-[100%] py-7 overflow-hidden">
                                <div>
                                    <div className="w-[100%] overflow-hidden">
                                        <div className="flex items-center justify-between w-[100%]">
                                            <Link
                                                href={`/profile/${quiz.author.id}`}
                                                className="flex items-start duration-300 hover:opacity-50"
                                            >
                                                {quiz.author.image && (
                                                    <img
                                                        src={quiz.author.image}
                                                        alt="profile image"
                                                        width={25}
                                                        height={25}
                                                        className="rounded-full"
                                                    />
                                                )}

                                                <div className="ml-2">
                                                    <p className="text-gray-400 text-[13px]">
                                                        {quiz.author.username}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500">
                                                        {formatDateToJST(
                                                            quiz.createdAt,
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
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
                                <div className="flex justify-between">
                                    <Link
                                        href={`/profile/${quiz.author.id}`}
                                        className="flex items-center duration-300 hover:opacity-50 w-fit"
                                    >
                                        {quiz.author.image && (
                                            <img
                                                src={quiz.author.image}
                                                alt="profile image"
                                                width={25}
                                                height={25}
                                                className="rounded-full"
                                            />
                                        )}
                                        <div className="ml-2">
                                            <p className="text-gray-400 text-[13px]">
                                                {quiz.author.username}
                                            </p>
                                        </div>
                                        <div className="w-[10px] h-[1px] bg-gray-600 ml-3"></div>
                                        <p className="text-[11px] text-gray-500 ml-3">
                                            {formatDateToJST(quiz.createdAt)}
                                        </p>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            const isDelete = confirm(
                                                'クイズを削除しますか？削除をすると復元できません',
                                            );
                                            if (!isDelete) {
                                                return;
                                            }
                                            deleteQuiz(quiz.id, quiz.author.id);
                                        }}
                                        className="text-[16px] text-[#555555] border border-[#555555] px-3 py-1 rounded-md hover:text-red-400 hover:border-red-400 duration-300"
                                    >
                                        削除する
                                    </button>
                                </div>

                                <div className="md:mt-1 mt-1 flex md:justify-end justify-around">
                                    {quiz.id === quizResponse.quizId &&
                                        quizResponse.result === 'true' &&
                                        !loading && (
                                            <div className="text-emerald-500 md:text-xl text-[20px] font-bold border w-full py-1 rounded-md border-emerald-500 text-center">
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

                                <div className="flex items-center justify-between md:mt-3 mt-2">
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
                                    {JSON.parse(quiz.question).map(
                                        (
                                            item:
                                                | {
                                                      id: string;
                                                      data: { code: string };
                                                  }
                                                | {
                                                      id: string;
                                                      data: { text: string };
                                                  },
                                        ) => (
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
                                        ),
                                    )}
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
