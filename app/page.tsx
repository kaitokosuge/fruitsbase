// import ProfileCard from '@/features/profileCardView/ProfileCard';
import Header from './../components/Header/Header';
import { Suspense } from 'react';
import Footer from './../components/Footer/Footer';
import TimelineQuizzesViewContainer from './../features/timelineQuizView/TimelineQuizzesViewContainer';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
    const user = await currentUser();
    return (
        <div>
            <Header user={user} />
            <main className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px]">
                <div className="w-[90%] mx-auto pt-5">
                    <div className="flex justify-between">
                        <div className="lg:w-[300px] w-[250px] md:block hidden">
                            {/* <ProfileCard authUser={authUser} /> */}
                            <div className="text-gray-600 lg:w-[300px] w-[250px] fixed bg-[#232323] px-4 py-4 rounded-md mt-[25px] h-[400px]">
                                comming soon
                            </div>
                        </div>
                        <div className="xl:w-[75%] lg:w-[65%] md:w-[60%] w-full">
                            <p className="text-xs font-bold">タイムライン</p>
                            <Suspense
                                fallback={
                                    <div className="text-xs font-bold mt-5 font-mono">
                                        loading...
                                    </div>
                                }
                            >
                                <TimelineQuizzesViewContainer />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
