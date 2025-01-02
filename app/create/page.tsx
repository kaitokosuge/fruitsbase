import QuizPost from '@/features/quizPost/QuizPost';
// import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function page() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    // const categories = await prisma.category.findMany({
    //     where: {
    //         authorId: userId,
    //     },
    // });

    return (
        <div>
            {/* <QuizPost categories={categories} /> */}
            <QuizPost />
        </div>
    );
}
