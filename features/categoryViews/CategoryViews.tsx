import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function CategoryViews() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const categories = await prisma.category.findMany({
        where: {
            authorId: userId,
        },
    });

    return (
        <div className="">
            {categories.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center w-fit rounded-md mt-3"
                >
                    <div className="font-bold">{item.name}</div>
                </div>
            ))}
        </div>
    );
}
