/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { SignInButton, SignedOut } from '@clerk/nextjs';
import { User } from '@/models/User';

export default function Header({ user }: { user: User | null }) {
    return (
        <>
            <header className="border-b rounded-b-[15px] border-[#2c2c2c] top-0 fixed w-full bg-[#171717] z-[1]">
                <div className="flex justify-between items-center mx-auto w-[90%] md:py-4 py-2">
                    <ul className="flex items-center">
                        <li>
                            <h1>
                                <Link href="/">
                                    <img
                                        src="/fruitsbase-logo.png"
                                        alt="fruitsbase"
                                        className="md:w-[100px] w-[70px]"
                                    />
                                </Link>
                            </h1>
                        </li>
                        <li className="ml-5 md:mt-2 mt-0 hover:opacity-50 duration-300">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/timeline.svg"
                                    className="md:w-[20px] w-[25px]"
                                    alt="timeline"
                                />
                                <p className="font-bold text-xs text-[#afafaf] ml-1 md:block hidden">
                                    タイムライン
                                </p>
                            </Link>
                        </li>
                    </ul>

                    <nav>
                        <ul className="flex items-center">
                            <li>
                                <Link
                                    href="/create"
                                    className="block md:text-sm text-xs bg-[#313131] duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold"
                                >
                                    クイズを作成
                                </Link>
                            </li>
                            <li className="h-[40px] pt-2 ml-4 hover:opacity-50 duration-200">
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                            </li>
                            <li>
                                {user && (
                                    <Link href={`/profile/${user.name}`}>
                                        {user.image && (
                                            <img
                                                src={user.image}
                                                width={30}
                                                height={30}
                                                alt="profile image"
                                                className="hover:opacity-50 duration-200 block rounded-full w-[40px] h-[40px] object-cover"
                                            />
                                        )}
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="w-screen bg-[#171717] md:top-[77px] top-[56.5px] h-[3.5px] fixed z-[50]"></div>
        </>
    );
}
