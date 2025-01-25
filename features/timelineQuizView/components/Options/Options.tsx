'use client';
import { DataItem } from '@/features/quizPost/hooks/useHandleOption/useHandleOption';
import { PublicQuiz } from '@/models/PublicQuiz';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Options({
    result,
    quiz,
    handleClickOption,
    selectedOptionIds,
}: {
    result: { result: string; quizId: string };
    quiz: PublicQuiz;
    handleClickOption: (optionId: string, quizId: string) => void;
    selectedOptionIds: string[];
}) {
    return (
        <div>
            <div className="grid md:mt-10 mt-5 lg:grid-cols-1 grid-cols-1 gap-4 text-white">
                {quiz.Option.map((option, index: number) => (
                    <button
                        onClick={() => {
                            if (result.result === 'true') {
                                return;
                            }
                            handleClickOption(option.id, quiz.id);
                        }}
                        className={
                            selectedOptionIds.some((id) => option.id === id)
                                ? result.result === 'true' &&
                                  result.quizId === quiz.id
                                    ? 'border-b border-b-[#404040] rounded-md text-left relative cursor-pointer bg-emerald-600 duration-200 md:pr-5'
                                    : 'border-b border-b-[#404040] rounded-md text-left relative cursor-pointer bg-[#313131] duration-200 md:pr-5'
                                : 'border-b border-b-[#404040] hover:rounded-md text-left relative cursor-pointer hover:bg-[#1a1a1a] duration-200 md:pr-5'
                        }
                        key={index}
                    >
                        <div className="overflow-scroll whitespace-nowrap py-3 pl-5 pr-5 hidden-scrollbar">
                            <p
                                className={
                                    selectedOptionIds.some(
                                        (id) => option.id === id,
                                    )
                                        ? result.result === 'true' &&
                                          result.quizId === quiz.id
                                            ? 'absolute text-2xl font-bold text-white duration-300'
                                            : 'absolute text-2xl font-bold text-emerald-600 duration-300'
                                        : 'absolute text-2xl font-bold text-[#5e5e5e]'
                                }
                            >
                                {index + 1}
                            </p>
                            <div className="mt-5">
                                {JSON.parse(option.option).map(
                                    (obj: DataItem) => (
                                        <div key={obj.id} className="pt-2">
                                            {'code' in obj.data ? (
                                                <div className="text-[13px] mt-2">
                                                    <SyntaxHighlighter
                                                        language="typescript"
                                                        style={atomOneDark}
                                                    >
                                                        {obj.data.code}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    {obj.data.text}
                                                </div>
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
