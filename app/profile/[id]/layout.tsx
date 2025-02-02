import Header from '@/components/Header/Header';
import React from 'react';
import { getUserData } from '../_features/repositories/getUserData/getUserData';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const id = (await params).id;
    const userData = await getUserData(id);

    return {
        title: `${userData?.username}のプロフィール`,
    };
}

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
