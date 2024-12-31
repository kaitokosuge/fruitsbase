/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { AuthUser } from './models/AuthUser';
import CategoryPost from '../categoryPost/CategoryPost';
import parse from 'html-react-parser';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { formatDateToJST } from './utiles/formatDateToJST';
import UserDelete from '../userDelete/UserDelete';
import { SignOut } from '../signOut/SignOut';

export default function ProfileCard({ authUser }: { authUser: AuthUser }) {
    if (!authUser) {
        return;
    }
    return (
        <div className="w-full">
            <p className="text-xs fixed">profile</p>
            <div className="lg:w-[300px] w-[250px] fixed bg-[#232323] px-4 py-4 rounded-md mt-[25px]">
                <div className="flex items-center">
                    {authUser.image && (
                        <img
                            src={authUser.image}
                            alt="profile"
                            className="rounded-full w-[40px]"
                        />
                    )}
                    <p className="font-bold text-[20px] ml-3">
                        {authUser?.username}
                    </p>
                </div>
                <div className="mt-5 w-[96%] mx-auto bg-[#292929] rounded-md px-3 pt-2 pb-5">
                    {authUser.Category.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center mt-4"
                        >
                            {category.svg && (
                                <div className="medium-svg">
                                    {parse(category.svg)}
                                </div>
                            )}
                            <p className="text-[15px] font-bold ml-2 text-gray-300">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <CategoryPost />
                    <Dialog>
                        <DialogTrigger className="mt-2 block text-sm border border-[#383838] rounded-md px-2 py-1 cursor-pointer">
                            Settings
                        </DialogTrigger>
                        <DialogContent className="bg-[#2c2c2c] border-none min-w-[60%] px-10 pb-10">
                            <DialogHeader>
                                <DialogTitle className="flex items-center justify-between">
                                    <div className="flex items-center mt-5">
                                        {authUser.image && (
                                            <img
                                                src={authUser.image}
                                                alt="profile"
                                                className="rounded-full w-[40px]"
                                            />
                                        )}
                                        <p className="font-bold text-[20px] ml-3">
                                            {authUser?.username}
                                        </p>
                                    </div>
                                    <SignOut />
                                </DialogTitle>
                                <DialogDescription className="mt-10">
                                    <span className="block mt-5">
                                        メールアドレス:
                                        <span className="text-[#a8a8a8] font-bold">
                                            {authUser?.email}
                                        </span>
                                    </span>
                                    <span className="block mt-5">
                                        Fruitsbaseを始めた日:
                                        <span className="text-[#a8a8a8] font-bold">
                                            {formatDateToJST(
                                                authUser?.createdAt,
                                            )}
                                        </span>
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                            <UserDelete />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
