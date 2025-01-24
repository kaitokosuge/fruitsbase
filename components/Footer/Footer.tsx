/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t rounded-t-[15px] border-[#2c2c2c] w-full bg-[#171717]">
            <div className="flex justify-between items-center mx-auto w-[90%] md:py-10 py-4">
                <Link href="/">
                    <img
                        src="/fruitsbase-logo.png"
                        alt="fruitsbase"
                        className="md:w-[150px] w-[150px]"
                    />
                </Link>
                <div className="flex">
                    <small className="font-mono">&copy;2025Fruitsbase</small>
                </div>
            </div>
            <div className="flex justify-between items-center mx-auto w-[90%] md:pb-10 pb-5 pl-1 text-gray-500">
                <div>
                    <Link
                        href="/privacy"
                        className="text-[10px] mr-5 duration-200 hover:opacity-55 block"
                    >
                        プライバシーポリシー
                    </Link>
                    <Link
                        href="/"
                        className="text-[10px] mr-5 duration-200 hover:opacity-55 block mt-2"
                    >
                        タイムライン
                    </Link>
                </div>
            </div>
        </footer>
    );
}
