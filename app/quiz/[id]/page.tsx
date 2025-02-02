import { getUserData } from '@/app/profile/_features/repositories/getUserData/getUserData';
import Header from '@/components/Header/Header';
import QuizShow from '@/features/detailQuizView/QuizShow';
import { Quiz } from '@/models/Quiz';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log('idです', id);
    const res = await fetch(`${process.env.APP_URL}/api/quiz/${id}`, {
        method: 'GET',
        next: { revalidate: 20 },
    });
    if (!res.ok) {
        console.error(`API Error: ${res.status}`);
        const errorText = await res.text();
        console.error('Error body:', errorText);
    }
    const data: { quiz: Quiz } = await res.json();
    const { userId } = await auth();
    const userData = await getUserData(userId);
    return (
        <div className="bg-[#171717] text-[#F0F0F0]">
            <Header user={userData} />
            <QuizShow quiz={data.quiz} />
        </div>
    );
}
