import prisma from '@/lib/prisma';
import React from 'react';
import QuizAuthViews from './QuizAuthViews';
import QuizViews from '../quizViews/QuizViews';

export default async function QuizAuthContainer({
    paramId,
    authId,
}: {
    paramId: string;
    authId: string | null;
}) {
    const userData = await prisma.user.findFirst({
        where: {
            id: paramId,
        },
        include: {
            Quiz: {
                include: {
                    Option: true,
                    Category_Quiz: {
                        include: {
                            category: true,
                        },
                    },
                    author: true,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            },
            Category: true,
        },
    });
    return (
        <div>
            {paramId === authId && paramId !== null && userData ? (
                <QuizAuthViews quizzes={userData.Quiz} />
            ) : (
                <>{userData && <QuizViews quizzes={userData.Quiz} />}</>
            )}
        </div>
    );
}
