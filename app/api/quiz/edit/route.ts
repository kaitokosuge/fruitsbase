import { FeaturesEditOption } from '@/features/quizPatch/models/FeaturesEditOption';
import { ParsedEditordata } from '@/features/quizPatch/models/ParsedEditordata';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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

export async function PATCH(req: NextRequest) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const data = await req.json();
    console.log('編集リクエストデータ', data);

    const options: FeaturesEditOption[] = data.options;
    if (options.length < 2 || 6 < options.length) {
        return;
    }
    const hasTrueOption = options.some((option) => option.is_correct === true);

    //クイズ本文バリデーション
    const questionText = data.question;

    if (questionText === '{}' || questionText === '[]') {
        console.log('クイズの文章が空です');
        console.log(questionText);
        return NextResponse.json({ res: 'fail', error: 'quizText' });
    }

    const questionObj: ParsedEditordata[] = JSON.parse(questionText);
    const isCodeExist = questionObj.some((question) => {
        if (question.type === 'code') {
            return question.data.code === '';
        }
    });
    console.log('コードは存在しているか', isCodeExist);

    if (isCodeExist) {
        console.log('クイズの文章におけるソースコードが空です');
        console.log(questionText);
        return NextResponse.json({ res: 'fail', error: 'quizTextCode' });
    }

    // 選択肢バリデーション
    if (!hasTrueOption) {
        console.log('一つも正しい選択肢がありません');
        return NextResponse.json({ res: 'fail', error: 'option' });
    }
    const isOptionTextNotExist = options.some(
        (option) => option.text === '' || option.text === '[]',
    );
    if (isOptionTextNotExist) {
        console.log('保存しようとした選択肢', options);
        console.log('空の選択肢があります');
        return NextResponse.json({ res: 'fail', error: 'optionText' });
    }

    const optionsObj: ParsedEditordata[] = options.flatMap((option) =>
        JSON.parse(option.text),
    );
    console.log('パースした選択肢', optionsObj);
    const isOptionCodeNotExist = optionsObj.some((option) => {
        if (option.type === 'code') {
            return option.data.code === '';
        }
    });
    console.log('保存しようとした選択肢', options);
    if (isOptionCodeNotExist) {
        console.log('保存しようとした選択肢', options);
        console.log('空のコードブロックがあります');
        return NextResponse.json({ res: 'fail', error: 'optionCode' });
    }
    const quizMadeUserId = await prisma.quiz.findUnique({
        where: { id: data.quizId },
        select: {
            authorId: true,
        },
    });
    if (!quizMadeUserId) {
        return;
    }
    console.log('作者IDです', quizMadeUserId, userId);
    if (quizMadeUserId.authorId !== userId) {
        return;
    }
    const explanationText: string = data.explanation;
    // const categories = data.categories;
    const quizRes = await prisma.quiz.update({
        where: {
            id: data.quizId,
        },
        data: {
            question: questionText,
            explanation: explanationText,
            authorId: userId,
            // Category_Quiz: {
            //     create: categories.map((id: string) => ({
            //         category: {
            //             connect: {
            //                 id: id,
            //             },
            //         },
            //     })),
            // },
        },
    });
    console.log('保存しようとした選択肢', options);
    for (let i = 0; options.length > i; i++) {
        const optionRes = await prisma.option.update({
            where: {
                id: data.options[i].id,
            },
            data: {
                option: options[i].text,
                is_correct: options[i].is_correct,
                quizId: quizRes.id,
            },
        });
        console.log('保存した選択肢', optionRes);
    }

    console.log('クイズ保存結果', quizRes);
    const postUser = await prisma.user.findUnique({
        where: { id: userId },
    });
    revalidatePath(`/profile/${postUser?.name}`);
    revalidatePath(`/quiz/${quizRes.id}`);
    return NextResponse.json({
        res: 'success',
        error: null,
        quizId: quizRes.id,
        userId: userId,
    });
}
