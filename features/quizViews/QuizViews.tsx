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
import Image from 'next/image';
import prisma from '@/lib/prisma';
import parse from 'html-react-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { DataItem } from '../quizPost/hooks/useHandleOption/useHandleOption';

export default async function QuizViews() {
    const quizzes = await prisma.quiz.findMany({
        include: {
            Category_Quiz: {
                include: {
                    category: true,
                },
            },
            Option: true,
        },
    });
    console.log('クイズ一覧', quizzes);
    function formatDateToJST(inputDate: Date): string {
        const jstDate = new Date(
            inputDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
        );
        const year = jstDate.getFullYear();
        const month = String(jstDate.getMonth() + 1).padStart(2, '0');
        const day = String(jstDate.getDate()).padStart(2, '0');

        //今年の年を取得
        const currentYear = new Date().getFullYear();

        //yyyyが今年と一致したら省略
        return year === currentYear
            ? `${month}/${day}`
            : `${year}/${month}/${day}`;
    }
    const renderQuizzes = quizzes.map((quiz) => ({
        id: quiz.id,
        question: JSON.parse(quiz.question)[0].data.text,
        createdAt: formatDateToJST(quiz.createdAt),
        categories: quiz.Category_Quiz,
        options: quiz.Option,
    }));
    return (
        <div className="text-black">
            {renderQuizzes.map((quiz) => (
                <div key={quiz.id} className="mt-5">
                    <Drawer>
                        <DrawerTrigger className="w-[80%] mx-auto bg-white text-left px-5 rounded-md flex justify-between items-center">
                            <div className="flex items-center w-[50%]">
                                <div className="min-w-[30px] h-[30px]">
                                    <Image
                                        src="/coverage.png"
                                        className="block h-full w-full rounded-full"
                                        alt="profile"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <p className="ml-3 overflow-scroll whitespace-nowrap py-5">
                                    {quiz.question}
                                </p>
                            </div>
                            <div className="w-[40%] flex items-center">
                                <p className="text-xs">{quiz.createdAt}</p>
                                {quiz.categories.map((category) => (
                                    <div
                                        key={category.category.name}
                                        className="flex items-center"
                                    >
                                        {category.category.svg && (
                                            <div className="small-svg ml-5 rounded-[5px]">
                                                {parse(category.category.svg)}
                                            </div>
                                        )}
                                        <p className="ml-1 text-[14px] font-bold">
                                            {category.category.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="min-h-[85%] max-h-[95%] md:px-10 bg-[#F0F0F0]">
                            <DrawerHeader className="xl:w-[80%] md:w-[95%] w-[100%] mx-auto">
                                <DrawerTitle className="md:text-[22px] text-[16px] mt-10 text-left text-black">
                                    {quiz.question}
                                </DrawerTitle>
                                <DrawerDescription></DrawerDescription>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center"></div>
                                    <div>
                                        <button className="bg-[#3333] text-white px-5 py-1 block rounded-md font-bold">
                                            解答する
                                        </button>
                                    </div>
                                </div>
                                <div className="grid mt-2 lg:grid-cols-2 grid-cols-1 gap-4 text-black">
                                    {quiz.options.map((option, index) => (
                                        <button
                                            className="border border-[#c9c9c9] text-left relative rounded-md"
                                            key={index}
                                        >
                                            <div className="absolute left-0 top-0 bg-none rounded-md bg-option-btn-left"></div>
                                            <div className="absolute right-0 rounded-md top-0 bg-option-btn-right"></div>
                                            <div className="overflow-scroll whitespace-nowrap py-5 pl-5 pr-5">
                                                {JSON.parse(option.option).map(
                                                    (obj: DataItem) => (
                                                        <div key={obj.id}>
                                                            {'code' in
                                                            obj.data ? (
                                                                <SyntaxHighlighter
                                                                    language="typescript"
                                                                    style={
                                                                        atomOneDark
                                                                    }
                                                                >
                                                                    {
                                                                        obj.data
                                                                            .code
                                                                    }
                                                                </SyntaxHighlighter>
                                                            ) : (
                                                                <div>
                                                                    {
                                                                        obj.data
                                                                            .text
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>閉じる</DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            ))}
        </div>
    );
}
