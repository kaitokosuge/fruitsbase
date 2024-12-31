/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs';
// import './globals.css';

export const metadata: Metadata = {
    title: 'setting',
    description: 'fruitsbase setting',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="ja">
                <body className="bg-[#171717] text-[#F0F0F0] w-[80%] mx-auto pt-5">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn></SignedIn>
                    <div className="flex justify-between">
                        <h1>
                            <img
                                src="/fruitsbase-logo.png"
                                alt="fruitsbase"
                                className="w-[120px]"
                            />
                        </h1>
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
