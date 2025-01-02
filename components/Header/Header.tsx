/* eslint-disable @next/next/no-img-element */
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';
import { SignInButton, SignedOut } from '@clerk/nextjs';

export default async function Header() {
    const user = await currentUser();
    return (
        <>
            <header className="border-b rounded-b-md border-[#2c2c2c] top-0 fixed w-full bg-[#171717] z-[1]">
                <div className="flex justify-between items-center mx-auto w-[90%] md:py-4 py-2">
                    <h1>
                        <Link href="/">
                            <img
                                src="/fruitsbase-logo.png"
                                alt="fruitsbase"
                                className="md:w-[100px] w-[70px]"
                            />
                        </Link>
                    </h1>
                    <nav>
                        <ul className="flex items-center">
                            <li>
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                            </li>
                            <li className="ml-5">
                                <Link
                                    href="/create"
                                    className="block md:text-sm bg-[#313131] duration-300 hover:bg-blue-900 rounded-md px-4 md:py-3 py-2 font-bold"
                                >
                                    クイズを作成
                                </Link>
                            </li>
                            <li>
                                {user && (
                                    <Link href={`/profile/${user.id}`}>
                                        <img
                                            src={user.imageUrl}
                                            width={30}
                                            height={30}
                                            alt="profile image"
                                            className="block rounded-full w-[40px] h-[40px] object-cover ml-5"
                                        />
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="w-screen bg-[#171717] md:top-[77px] top-[57px] h-[3px] fixed z-[50]"></div>
        </>
    );
}
