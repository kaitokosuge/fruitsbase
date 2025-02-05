// import CategoryViews from '@/features/categoryViews/CategoryViews';
import React, { Suspense } from 'react';
import BasicProfileContainer from '@/features/basicProfileView/BasicProfileContainer';
import ProfileQuizzesViewContainer from '@/features/profileQuizzesView/ProfileQuizzesViewContainer';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="bg-[#171717] text-[#F0F0F0] min-h-screen">
            <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto">
                <div className="flex flex-wrap justify-between w-full mt-10">
                    <Suspense
                        fallback={
                            <div className="md:w-[380px] w-full">
                                <div className="flex items-center">
                                    <div className="w-[80px] h-[80px] rounded-full bg-gray-400"></div>
                                    <h2 className="font-mono font-bold text-xl ml-5">
                                        loading...
                                    </h2>
                                </div>
                            </div>
                        }
                    >
                        <BasicProfileContainer paramName={id} />
                    </Suspense>
                    <div className="md:w-[calc(100%-380px)] w-full">
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
