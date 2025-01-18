import { auth } from '@clerk/nextjs/server';
import React from 'react';
import AuthQuizzesView from './AuthQuizzesView';
import QuizzesView from './QuizzesView';
import { Quiz } from '@/models/Quiz';

export default async function ProfileQuizzesViewContainer({
    paramId,
}: {
    paramId: string;
}) {
    const { userId } = await auth();
    const res = await fetch(
        `/api/user/${paramId}/quizzes`,
        {
            method: 'GET',
            next: { revalidate: 3 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        return (
            <div>
                <p className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[60px] w-[90%] mx-auto font-mono">
                    error
                </p>
            </div>
        );
    }
    const data: { quizzes: Quiz[]; quizCount: number } = await res.json();
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
