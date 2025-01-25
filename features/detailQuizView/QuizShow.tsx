'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
const PostDate = dynamic(() => import('./components/PostDate/PostDate'), {
    ssr: false,
});
import CategoryArea from './components/CategoryArea/CategoryArea';
import AnswerBtn from './components/AnswerBtn/AnswerBtn';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Options from './components/Options/Options';
import { useOption } from './hooks/useOption/useOption';
import { useTry } from './hooks/useTry/useTry';
import { Quiz } from '@/models/Quiz';
import QuizExplanation from './components/QuizExplanation/QuizExplanation';

export default function QuizShow({ quiz }: { quiz: Quiz }) {
    const { handleClickOption, selectedOptionIds } = useOption();
    const { handleClickSubmit, quizResponse, loading } = useTry();
    return (
        <div className="p-5 md:pb-[300px] pb-[100px] md:pt-[100px] pt-[70px] px-5 xl:w-[60%] lg:w-[65%] md:w-[95%] w-[100%] mx-auto">
            <Link
                scroll={true}
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
                    <PostDate date={quiz.createdAt} />
                </p>
            </Link>
            <div className="md:mt-2 mt-2 flex md:justify-end justify-around">
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
            {quizResponse.explanation && quizResponse.explanation !== '{}' && (
                <QuizExplanation explanation={quizResponse.explanation} />
            )}
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
                        handleClickSubmit={handleClickSubmit}
                        loading={loading}
                        quizId={quiz.id}
                        selectedOptionIds={selectedOptionIds}
                        isTrue={quizResponse.result}
                    />
                </div>
            </div>

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
                        <div key={item.id} className="max-w-full">
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
                                <div className="mt-4">{item.data.text}</div>
                            )}
                        </div>
                    ),
                )}
            </div>

            <Options
                result={quizResponse}
                selectedOptionIds={selectedOptionIds}
                quiz={quiz}
                handleClickOption={handleClickOption}
            />
        </div>
    );
}
