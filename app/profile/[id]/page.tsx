import Header from '@/components/Header/Header';
// import CategoryViews from '@/features/categoryViews/CategoryViews';
import React, { Suspense } from 'react';
import BasicProfileContainer from '@/features/basicProfileView/BasicProfileContainer';
import ProfileQuizzesViewContainer from '@/features/profileQuizzesView/ProfileQuizzesViewContainer';
import { currentUser } from '@clerk/nextjs/server';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await currentUser();
    return (
        <div>
            <Header user={user} />
            <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto">
                <div className="flex flex-wrap justify-between w-full mt-10">
                    <Suspense
                        fallback={
                            <div className="md:w-[20%] w-full">
                                <div className="flex items-center">
                                    <div className="w-[80px] h-[80px] rounded-full bg-gray-400"></div>
                                    <h2 className="font-mono font-bold text-xl ml-5">
                                        loading...
                                    </h2>
                                </div>
                            </div>
                        }
                    >
                        <BasicProfileContainer paramId={id} />
                    </Suspense>
                    <div className="md:w-[70%] w-full">
                        <p className="text-gray-400 border-b border-blue-900 w-fit pb-1 md:mt-0 mt-10">
                            投稿したクイズ
                        </p>
                        <div>
                            <Suspense
                                fallback={
                                    <div className="text-xs font-bold mt-5 font-mono">
                                        loading...
                                    </div>
                                }
                            >
                                <ProfileQuizzesViewContainer paramId={id} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
