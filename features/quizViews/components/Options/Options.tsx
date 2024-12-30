'use client';
import { DataItem } from '@/features/quizPost/hooks/useHandleOption/useHandleOption';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Options({
    quiz,
    handleClickOption,
}: {
    quiz: any;
    handleClickOption: (optionId: string, quizId: string) => void;
}) {
    return (
        <div>
            <div className="grid mt-2 lg:grid-cols-1 grid-cols-1 gap-4 text-white">
                {quiz.options.map((option, index) => (
                    <button
                        onClick={() => handleClickOption(option.id, quiz.id)}
                        className="border-b border-b-[#404040] rounded-md text-left relative cursor-pointer hover:bg-[#3c3c3c] duration-200 pr-5"
                        key={index}
                    >
                        <div className="overflow-scroll whitespace-nowrap py-7 pl-5 pr-5">
                            <p className="absolute text-xl font-bold text-blue-500">
                                {index + 1}
                            </p>
                            {JSON.parse(option.option).map((obj: DataItem) => (
                                <div key={obj.id} className="pt-10">
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
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
