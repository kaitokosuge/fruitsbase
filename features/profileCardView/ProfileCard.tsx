/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { AuthUser } from './models/AuthUser';
import CategoryPost from '../categoryPost/CategoryPost';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function ProfileCard({ authUser }: { authUser: AuthUser }) {
    if (!authUser) {
        return;
    }
    return (
        <div className="w-full mt-20">
            <div className="w-[300px] fixed bg-[#232323] px-4 py-4 rounded-md">
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
                    <Link
                        href="/create"
                        className="block text-sm border border-[#383838] rounded-md px-2 py-1 mt-2"
                    >
                        クイズを作成
                    </Link>
                    <CategoryPost />
                    <Link
                        href="/user-profile"
                        className="mt-2 block text-sm border border-[#383838] rounded-md px-2 py-1 cursor-pointer"
                    >
                        setting
                    </Link>
                </div>
            </div>
        </div>
    );
}
