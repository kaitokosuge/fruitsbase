/* eslint-disable @next/next/no-img-element */
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
import UserDelete from '@/features/userDelete/UserDelete';
import Header from '@/components/Header/Header';
import prisma from '@/lib/prisma';

export default async function BasicProfileContainer({
    paramId,
    authId,
}: {
    paramId: string;
    authId: string | null;
}) {
    const existingUserRecord = await prisma.user.findFirst({
        where: {
            id: paramId,
        },
    });
    if (!existingUserRecord) {
        return (
            <div>
                <Header />
                <p className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[60px] w-[90%] mx-auto font-mono">
                    user not found
                </p>
            </div>
        );
    }
    return (
        <div className="md:w-[20%] w-full">
            <div className="flex items-center">
                {existingUserRecord?.image && (
                    <img
                        src={existingUserRecord?.image}
                        alt="profile"
                        className="w-[80px] h-[80px] rounded-full"
                    />
                )}
                <h2 className="font-bold text-xl ml-5">
                    {existingUserRecord?.username}
                </h2>
            </div>
            {/* <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 mt-10">
                                カテゴリー
                            </p>
                            <div className="mt-3">
                                <CategoryViews />
                            </div> */}
            {authId === paramId && authId !== null && existingUserRecord && (
                <Dialog>
                    <DialogTrigger className="mt-5 block text-sm border border-[#383838] rounded-md px-2 py-1 cursor-pointer">
                        Settings
                    </DialogTrigger>
                    <DialogContent className="text-left bg-[#2c2c2c] border-none min-w-[60%] px-10 pb-10">
                        <DialogHeader className="text-left">
                            <DialogTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {existingUserRecord?.image && (
                                        <img
                                            src={existingUserRecord.image}
                                            alt="profile"
                                            className="rounded-full w-[40px]"
                                        />
                                    )}
                                    <p className="font-bold text-[20px] ml-3">
                                        {existingUserRecord?.username}
                                    </p>
                                </div>
                                <SignOut />
                            </DialogTitle>
                            <DialogDescription className="mt-10">
                                <span className="block mt-5">
                                    メールアドレス:
                                    <span className="text-[#a8a8a8] font-bold">
                                        {existingUserRecord?.email}
                                    </span>
                                </span>
                                <span className="block mt-5">
                                    Fruitsbaseを始めた日:
                                    <span className="text-[#a8a8a8] font-bold">
                                        {formatDateToJST(
                                            existingUserRecord?.createdAt,
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
    );
}
