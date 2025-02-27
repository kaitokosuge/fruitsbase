/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { User } from '@/models/User';
import { auth } from '@clerk/nextjs/server';
import SubHeader from '@/components/SubHeader/SubHeader';
import Link from 'next/link';
import { SignOut } from '../signOut/SignOut';

export default async function BasicProfileContainer({
    paramName,
}: {
    paramName: string;
}) {
    const { userId } = await auth();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/${paramName}`,
        {
            method: 'GET',
            next: { revalidate: 3 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        return (
            <div>
                <SubHeader />
                <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[60px] w-[90%] mx-auto font-mono">
                    <img src="/error-tell.svg" />
                </div>
            </div>
        );
    }

    const resData: { userData: User | null } = await res.json();
    if (!resData.userData) {
        return (
            <div>
                <SubHeader />
                <div className="bg-[#171717] text-[#F0F0F0] w-[90%] mx-auto font-mono">
                    <img src="/not-found-user.svg" className="w-[200px]" />
                </div>
            </div>
        );
    }
    return (
        <div className="md:w-[350px] w-full">
            <div className="flex items-center">
                {resData.userData.image && (
                    <img
                        width={80}
                        height={80}
                        src={resData.userData.image}
                        alt="profile"
                        className="w-[80px] h-[80px] rounded-full object-cover"
                    />
                )}
                <div className="font-bold text-xl ml-5 overflow-hidden whitespace-nowrap">
                    {resData.userData.username}
                    <p className="text-xs font-normal mt-1 text-gray-600">
                        @{resData.userData.name}
                    </p>
                </div>
            </div>

            {resData.userData.bio && (
                <p className="text-xs text-[#aaaaaa] mt-3 md:w-[350px] w-full overflow-scroll hidden-scrollbar">
                    {resData.userData.bio}
                </p>
            )}

            {/* <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 mt-10">
                                カテゴリー
                            </p>
                            <div className="mt-3">
                                <CategoryViews />
                            </div> */}
            {resData.userData.id === userId &&
                userId !== null &&
                resData.userData && (
                    <div className="flex">
                        <Link
                            href={`/profile/setting`}
                            className="text-xs mt-5 block text-[#727272] hover:text-white duration-300 border border-[#383838] rounded-md px-2 py-1 cursor-pointer w-fit"
                        >
                            プロフィールの編集 →
                        </Link>
                        <SignOut />
                    </div>
                )}
        </div>
    );
}
