import Header from '@/components/Header/Header';
import React from 'react';
import { getUserData } from '../_features/repositories/getUserData/getUserData';
import { auth } from '@clerk/nextjs/server';

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}>) {
    const { userId } = await auth();
    const userData = await getUserData(userId);

    return (
        <div>
            <Header user={userData} />
            {children}
        </div>
    );
}
