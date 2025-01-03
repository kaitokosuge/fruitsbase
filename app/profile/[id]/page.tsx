/* eslint-disable @next/next/no-img-element */
import Header from '@/components/Header/Header';
// import CategoryViews from '@/features/categoryViews/CategoryViews';
import QuizAuthViews from '@/features/quizAuthViews/QuizAuthViews';
import QuizViews from '@/features/quizViews/QuizViews';
import UserDelete from '@/features/userDelete/UserDelete';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { SignOut } from '@/features/signOut/SignOut';
import { formatDateToJST } from '@/features/profileCardView/utiles/formatDateToJST';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { userId } = await auth();

    const existingUserRecord = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    console.log('存在してる', existingUserRecord);
    if (!existingUserRecord) {
        return (
            <div>
                <Header />
                <p className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[60px] w-[90%] mx-auto">
                    user not found
                </p>
            </div>
        );
    }
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
                    <div className="md:w-[20%] w-full">
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
                        {/* <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 mt-10">
                            カテゴリー
                        </p>
                        <div className="mt-3">
                            <CategoryViews />
                        </div> */}
                        {userId === id && userId !== null && userData && (
                            <Dialog>
                                <DialogTrigger className="mt-5 block text-sm border border-[#383838] rounded-md px-2 py-1 cursor-pointer">
                                    Settings
                                </DialogTrigger>
                                <DialogContent className="text-left bg-[#2c2c2c] border-none min-w-[60%] px-10 pb-10">
                                    <DialogHeader className="text-left">
                                        <DialogTitle className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {userData?.image && (
                                                    <img
                                                        src={userData.image}
                                                        alt="profile"
                                                        className="rounded-full w-[40px]"
                                                    />
                                                )}
                                                <p className="font-bold text-[20px] ml-3">
                                                    {userData?.username}
                                                </p>
                                            </div>
                                            <SignOut />
                                        </DialogTitle>
                                        <DialogDescription className="mt-10">
                                            <span className="block mt-5">
                                                メールアドレス:
                                                <span className="text-[#a8a8a8] font-bold">
                                                    {userData?.email}
                                                </span>
                                            </span>
                                            <span className="block mt-5">
                                                Fruitsbaseを始めた日:
                                                <span className="text-[#a8a8a8] font-bold">
                                                    {formatDateToJST(
                                                        userData?.createdAt,
                                                    )}
                                                </span>
                                            </span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <UserDelete />
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    <div className="md:w-[70%] w-full">
                        <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 md:mt-0 mt-10">
                            投稿したクイズ
                        </p>
                        <div>
                            {userId === id && userId !== null && userData ? (
                                <QuizAuthViews quizzes={userData.Quiz} />
                            ) : (
                                <>
                                    {userData && (
                                        <QuizViews quizzes={userData.Quiz} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
