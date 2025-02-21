import prisma from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

// 編集対象のクイズデータを取得する関数
export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const editId = searchParams.get('editid');
    console.log('抽出したクエリパラメータ', editId);
    // const headersList = await headers();
    // const editQuizId = headersList.get('editQuizId');
    if (!editId) {
        return NextResponse.json({
            editQuiz: null,
            error: 'headerにidがありません',
        });
    }
    const editQuiz = await prisma.quiz.findUnique({
        where: { id: editId },
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
    console.log('取得したクイズ', editQuiz);

    if (!editQuiz) {
        return NextResponse.json({
            editQuiz: null,
            error: '編集対象のクイズが存在しません',
        });
    }

    return NextResponse.json({
        editQuiz: editQuiz,
        error: null,
    });
}
