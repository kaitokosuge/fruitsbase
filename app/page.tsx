/* eslint-disable @next/next/no-img-element */
import QuizViews from './../features/quizViews/QuizViews';
import prisma from '@/lib/prisma';
import ProfileCard from '@/features/profileCardView/ProfileCard';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const quizzes = await prisma.quiz.findMany({
        include: {
            Category_Quiz: {
                include: {
                    category: true,
                },
            },
            Option: true,
            author: true,
        },
    });
    const authUser = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            Category: true,
        },
    });
    return (
        <main className="bg-[#171717] text-[#F0F0F0]">
            <div className="w-[90%] mx-auto pt-5">
                <h1>
                    <img
                        src="/fruitsbase-logo.png"
                        alt="fruitsbase"
                        className="w-[120px] fixed"
                    />
                </h1>
                <div className="flex justify-between">
                    <div className="lg:w-[300px] w-[250px] md:block hidden">
                        <ProfileCard authUser={authUser} />
                    </div>
                    <div className="xl:w-[75%] lg:w-[65%] md:w-[60%] w-full">
                        <QuizViews quizzes={quizzes} />
                    </div>
                </div>
            </div>
        </main>
    );
}
