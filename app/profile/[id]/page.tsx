/* eslint-disable @next/next/no-img-element */
import Header from '@/components/Header/Header';
import CategoryViews from '@/features/categoryViews/CategoryViews';
import QuizAuthViews from '@/features/quizAuthViews/QuizAuthViews';
import QuizViews from '@/features/quizViews/QuizViews';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { userId } = await auth();

    const userData = await prisma.user.findFirst({
        where: {
            id: id,
        },
        include: {
            Quiz: {
                include: {
                    Option: true,
                    Category_Quiz: {
                        include: {
                            category: true,
                        },
                    },
                    author: true,
                },
            },
            Category: true,
        },
    });
    return (
        <div>
            <Header />
            <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto">
                <div className="flex flex-wrap justify-between w-full mt-10">
                    <div className="md:w-[47%] w-full">
                        <div className="flex items-center">
                            {userData?.image && (
                                <img
                                    src={userData?.image}
                                    alt="profile"
                                    className="w-[80px] h-[80px] rounded-full"
                                />
                            )}
                            <h2 className="font-bold text-xl ml-5">
                                {userData?.username}
                            </h2>
                        </div>
                        <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 mt-10">
                            カテゴリー
                        </p>
                        <div className="mt-3">
                            <CategoryViews />
                        </div>
                    </div>
                    <div className="md:w-[50%] w-full">
                        <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 md:mt-0 mt-10">
                            投稿したクイズ
                        </p>
                        <div>
                            {userId === id ? (
                                <QuizAuthViews quizzes={userData?.Quiz} />
                            ) : (
                                <QuizViews quizzes={userData?.Quiz} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
