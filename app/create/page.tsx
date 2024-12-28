import CategoryViews from '@/features/categoryViews/CategoryViews';
import QuizPost from '@/features/quizPost/QuizPost';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function page() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    return (
        <div>
            <h2 className="w-[700px] mx-auto text-gray-400">クイズの投稿</h2>
            <QuizPost />
            <CategoryViews />
        </div>
    );
}
