import Header from '@/components/Header/Header';
import { User } from '@/models/User';
import React from 'react';

export default async function layout({
    params,
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}>) {
    const { id } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/${id}`,
        {
            method: 'GET',
            next: { revalidate: 3 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    const data: { userData: User } = await res.json();

    return (
        <div>
            <Header user={data.userData} />
            {children}
        </div>
    );
}
