import QuizViews from './../features/quizViews/QuizViews';
import prisma from '@/lib/prisma';
// import ProfileCard from '@/features/profileCardView/ProfileCard';
import { auth } from '@clerk/nextjs/server';
import Header from '@/components/Header/Header';

export default async function Home() {
    const { userId } = await auth();

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
    let authUser;
    if (userId) {
        authUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                Category: true,
            },
        });
    }

    console.log(authUser);
    return (
        <>
            <Header />
            <main className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px]">
                <div className="w-[90%] mx-auto pt-5">
                    <div className="flex justify-between">
                        <div className="lg:w-[300px] w-[250px] md:block hidden">
                            {/* <ProfileCard authUser={authUser} /> */}
                            <div className="text-gray-400 lg:w-[300px] w-[250px] fixed bg-[#232323] px-4 py-4 rounded-md mt-[25px] h-[400px]">
                                comming soon
                            </div>
                        </div>
                        <div className="xl:w-[75%] lg:w-[65%] md:w-[60%] w-full">
                            <QuizViews quizzes={quizzes} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
