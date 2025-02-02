import Header from '@/components/Header/Header';
import React from 'react';
import { getUserData } from '../_features/repositories/getUserData/getUserData';

export default async function layout({
    params,
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}>) {
    const { id } = await params;
    const userData = await getUserData(id);

    return (
        <div>
            <Header user={userData} />
            {children}
        </div>
    );
}
