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
                        className="md:w-[150px] w-[100px]"
                    />
                </Link>
                <div>
                    <small className="font-mono">&copy;Fruitsbase</small>
                </div>
            </div>
        </footer>
    );
}
