import QuizPatch from '@/features/quizPatch/QuizPatch';
import { auth } from '@clerk/nextjs/server';
import { Quiz } from '@prisma/client';
import React, { Suspense } from 'react';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        redirectToSignIn();
    }

    const editQuizId = (await params).id;
    console.log('パラメータ', editQuizId);
    const res = await fetch(
        `http://localhost:3000/api/quiz/edit?editid=${editQuizId}`,
        {
            method: 'GET',
        },
    );

    if (!res.ok) {
        // ネットワークエラー、DBサーバーエラー、検知できないエラー
        console.log('クイズ取得失敗です');
        return <>エラーです。時間をおいて、再度ご訪問ください</>;
    }

    // error = コードベースで記述できるもの
    // いずれもnullチェックを忘れずに
    const data: { editQuiz: Quiz | null; error: string | null } =
        await res.json();
    console.log('レスポンス', data.editQuiz);
    console.log(data.error);
    return (
        <div>
            {data.editQuiz ? (
                <>
                    <Suspense fallback={<>loading</>}>
                        <QuizPatch />
                    </Suspense>
                </>
            ) : (
                <>
                    編集対象のクイズは削除された可能性があります。また、URLが正しいかご確認ください
                </>
            )}
        </div>
    );
}
