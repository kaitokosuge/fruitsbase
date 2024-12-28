import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const data = await req.json();
    const questionText = data.question;
    const explanationText = data.explanation;
    const categories = data.categories;
    const quizRes = await prisma.quiz.create({
        data: {
            question: questionText,
            explanation: explanationText,
            authorId: userId,
            Category_Quiz: {
                create: categories.map((id: string) => ({
                    category: {
                        connect: {
                            id: id,
                        },
                    },
                })),
            },
        },
    });

    const options = data.options;
    for (let i = 0; options.length > i; i++) {
        const optionRes = await prisma.option.create({
            data: {
                option: options[i].text,
                is_correct: options[i].is_correct,
                quizId: quizRes.id,
            },
        });
        console.log('保存した選択肢', optionRes);
    }

    console.log('クイズ保存結果', quizRes);

    return NextResponse.json({ res: 'success' });
}
