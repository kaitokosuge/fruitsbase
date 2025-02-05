import React from 'react';
import ImageForm from '../_features/components/ImageForm/ImageForm';
import { auth } from '@clerk/nextjs/server';
import { getUserData } from '../_features/repositories/getUserData/getUserData';

import UserDelete from '@/features/userDelete/UserDelete';
import BasicForm from '../_features/components/BasicForm/BasicForm';

export default async function Page() {
    const { userId } = await auth();
    const userData = await getUserData(userId);
    if (!userData) {
        return;
    }

    return (
        <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto pb-20">
            <h2 className="text-white text-4xl pt-10 mx-auto w-[350px] sm:w-[600px] md:w-[650px]">
                {userData.username}&ensp;
            </h2>
            <div className="text-white text-xs mx-auto w-[350px] sm:w-[600px] md:w-[650px]">
                <span className="text-[#a8a8a8] font-bold">
                    {userData.email}
                </span>
            </div>
            <ImageForm userImage={userData?.image} />
            <BasicForm userData={userData} />
            <UserDelete />
        </div>
    );
}
