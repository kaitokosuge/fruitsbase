/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../../components/ui/drawer';
import Options from './components/Options/Options';
import { useOption } from './hooks/useOption/useOption';
const PostDate = dynamic(() => import('./components/PostDate/PostDate'), {
    ssr: false,
});
import AnswerBtn from './components/AnswerBtn/AnswerBtn';
import CategoryArea from './components/CategoryArea/CategoryArea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTry } from './hooks/useTry/useTry';
import Link from 'next/link';
import { useGetQuizByLimit } from './hooks/useGetQuizByLimit/useGetQuizByLimit';
import GetMoreQuizBtn from './components/GetMoreQuizBtn/GetMoreQuizBtn';
import dynamic from 'next/dynamic';
import QuizExplanation from './components/QuizExplanation/QuizExplanation';
import { EditorObject } from './types/EditorObject';
import { PublicQuiz } from '@/models/PublicQuiz';

export default function QuizViews({ quizzes }: { quizzes: PublicQuiz[] }) {
    const { handleClickOption, selectedOptionIds, setSelectedOptionIds } =
        useOption();
    const { handleClickSubmit, quizResponse, setQuizResponse, loading } =
        useTry();
    const {
        viewQuizzes,
        handleClickGetQuiz,
        callNumber,
        getloading,
        isLoadable,
    } = useGetQuizByLimit(quizzes);

    return (
        <div className="pb-40 w-full">
            {viewQuizzes &&
                viewQuizzes.map((quiz) => (
                    <div key={quiz.id} className="mt-[10px]">
                        <Drawer>
                            <DrawerTrigger
                                onClick={() => {
                                    setSelectedOptionIds([]);
                                    setQuizResponse({
                                        result: '',
                                        quizId: '',
                                        explanation: '',
                                    });
                                }}
                                className="border-t border-t-[#484848] bg-[#292929] w-full text-left px-5 rounded-md flex justify-between items-center"
                            >
                                <div className="flex items-center w-[100%] py-5 overflow-hidden">
                                    <div className="w-full">
                                        <div className="w-full overflow-hidden flex items-center justify-between hidden-scrollbar">
                                            <div className="flex items-start justify-between w-full">
                                                <Link
                                                    scroll={true}
                                                    href={`/profile/${quiz.author.id}`}
                                                    className="flex items-start duration-300 hover:opacity-50"
                                                >
                                                    {quiz.author.image && (
                                                        <img
                                                            src={
                                                                quiz.author
                                                                    .image
                                                            }
                                                            alt="profile image"
                                                            width={25}
                                                            height={25}
                                                            className="rounded-full object-cover w-[25px] h-[25px]"
                                                        />
                                                    )}

                                                    <div className="ml-2">
                                                        <p className="text-gray-400 text-[13px]">
                                                            {
                                                                quiz.author
                                                                    .username
                                                            }
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">
                                                            <PostDate
                                                                date={
                                                                    quiz.createdAt
                                                                }
                                                            />
                                                        </p>
                                                    </div>
                                                </Link>
                                                <Link
                                                    scroll={true}
                                                    href={`/quiz/${quiz.id}`}
                                                    className="hover:opacity-50 duration-200"
                                                >
                                                    <img
                                                        src="/show.svg"
                                                        alt="show page"
                                                        className="md:w-[26px] w-[25px]"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="text-[17px] w-full whitespace-nowrap font-bold pt-5">
                                            {JSON.parse(quiz.question)[0].data
                                                .text ? (
                                                <div className="w-fit">
                                                    {
                                                        JSON.parse(
                                                            quiz.question,
                                                        )[0].data.text
                                                    }
                                                </div>
                                            ) : (
                                                <div className="w-full">
                                                    <SyntaxHighlighter
                                                        language="typescript"
                                                        style={atomOneDark}
                                                    >
                                                        {
                                                            JSON.parse(
                                                                quiz.question,
                                                            )[0].data.code
                                                        }
                                                    </SyntaxHighlighter>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex overflow-x-scroll items-center w-full mt-3 hidden-scrollbar">
                                            <CategoryArea quiz={quiz} />
                                        </div>
                                    </div>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="md:min-h-[calc(100dvh-80px)] md:max-h-[calc(100dvh-80px)] min-h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] md:px-10 bg-[#131313]">
                                <div className="h-[20px] w-[calc(100vw-10px)] bg-[#131313] rounded-t-[15px] fixed rigth-0 left-0 z-20"></div>
                                <DrawerHeader className="pt-10 md:pb-60 px-5 pb-40 xl:w-[60%] lg:w-[65%] md:w-[95%] w-[100%] mx-auto overflow-y-scroll hidden-scrollbar">
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
                                                className="rounded-full object-cover w-[25px] h-[25px]"
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
                                    {quizResponse.explanation &&
                                        quizResponse.explanation !== '{}' && (
                                            <QuizExplanation
                                                explanation={
                                                    quizResponse.explanation
                                                }
                                            />
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
                                                handleClickSubmit={
                                                    handleClickSubmit
                                                }
                                                loading={loading}
                                                quizId={quiz.id}
                                                selectedOptionIds={
                                                    selectedOptionIds
                                                }
                                                isTrue={quizResponse.result}
                                            />
                                        </div>
                                    </div>
                                    <DrawerTitle className=""></DrawerTitle>
                                    <div className="font-normal md:text-[18px] text-[15px] text-left max-w-full text-[#F0F0F0]">
                                        {JSON.parse(quiz.question).map(
                                            (item: EditorObject) => (
                                                <div
                                                    key={item.id}
                                                    className="max-w-full"
                                                >
                                                    {'code' in item.data ? (
                                                        <div className="text-[13px] mt-4 md:w-full w-[340px] mx-auto">
                                                            <SyntaxHighlighter
                                                                language="typescript"
                                                                style={
                                                                    atomOneDark
                                                                }
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
                                    <DrawerDescription className=""></DrawerDescription>
                                    <Options
                                        result={quizResponse}
                                        selectedOptionIds={selectedOptionIds}
                                        quiz={quiz}
                                        handleClickOption={handleClickOption}
                                    />
                                </DrawerHeader>
                                <DrawerFooter className="hidden opacity-80 items-center rounded-t-[10px] border-t border-[#68686833]"></DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                ))}
            <GetMoreQuizBtn
                isLoadable={isLoadable}
                callNumber={callNumber}
                handleClickGetQuiz={handleClickGetQuiz}
            />
            {getloading && (
                <div className="font-mono text-sm w-fit mx-auto mt-2">
                    loading...
                </div>
            )}
            {!isLoadable && (
                <div className="font-mono text-sm w-fit mx-auto mt-2">
                    🍾That&apos;s all,Thank you🍾
                </div>
            )}
        </div>
    );
}
