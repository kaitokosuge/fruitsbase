import Header from '@/components/Header/Header';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();
    return (
        <div>
            <Header user={user} />
            {children}
        </div>
    );
}
