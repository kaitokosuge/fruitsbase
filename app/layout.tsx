import type { Metadata } from 'next';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
    title: 'Fruitsbase',
    description:
        'プログラミング・IT技術で学んだことはFruitsbaseでクイズにしよう!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="ja">
                <body className="bg-[#171717] text-[#F0F0F0] w-screen min-h-screen">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn></SignedIn>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
