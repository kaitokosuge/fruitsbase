import React from 'react';
import ImageForm from '../../_features/components/ImageForm/ImageForm';
import { auth } from '@clerk/nextjs/server';
import { getUserData } from '../../_features/repositories/getUserData/getUserData';

export default async function Page() {
    const { userId } = await auth();
    const userData = await getUserData(userId);
    return (
        <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto">
            <h2 className="font-mono text-[#7b7b7b] text-xs pt-10 mx-auto w-[350px] sm:w-[600px] md:w-[650px]">
                プロフィールの編集
            </h2>
            <ImageForm userImage={userData?.image} />
        </div>
    );
}
