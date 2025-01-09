import prisma from '@/lib/prisma';
import React from 'react';
import QuizAuthViews from '../quizAuthViews/QuizAuthViews';
import QuizViews from './QuizViews';

export default async function Container({
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
