/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import AuthQuizzesView from './AuthQuizzesView';
import QuizzesView from './QuizzesView';
import { PublicQuiz } from '@/models/PublicQuiz';

export default async function ProfileQuizzesViewContainer({
    paramId,
}: {
    paramId: string;
}) {
    const { userId } = await auth();
    const res = await fetch(
        `${process.env.APP_URL}/api/user/${paramId}/quizzes`,
        {
            method: 'GET',
            next: { revalidate: 30 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        return (
            <div>
                <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[60px] w-[90%] mx-auto font-mono">
                    <img src="/not-found-user.svg" />
                </div>
            </div>
        );
    }
    const data: { quizzes: PublicQuiz[]; quizCount: number } = await res.json();
    return (
        <div>
            {paramId === userId && userId !== null ? (
                <AuthQuizzesView
                    paramUserId={paramId}
                    quizzes={data.quizzes}
                    quizCount={data.quizCount}
                />
            ) : (
                <>
                    <QuizzesView
                        paramUserId={paramId}
                        quizzes={data.quizzes}
                        quizCount={data.quizCount}
                    />
                </>
            )}
        </div>
    );
}
