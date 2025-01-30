import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { jaJP } from '@clerk/localizations';

import { Analytics } from '@vercel/analytics/react';

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
        <ClerkProvider localization={jaJP}>
            <html lang="ja">
                <body className="bg-[#171717] text-[#F0F0F0] w-screen min-h-screen">
                    {children}
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
