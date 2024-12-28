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
    console.log(categories);
    return <div></div>;
}
