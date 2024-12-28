'use server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// category: { name: string; svg: string }

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function submitCategory(formData: FormData): Promise<void> {
    await sleep(2000);
    try {
        const { userId } = await auth();
        if (!userId) {
            console.log('loginしていません');
            return;
        }
        const categoryName = formData.get('name');
        if (!categoryName || typeof categoryName !== 'string') {
            throw new Error();
        }
        const categorySvg = formData.get('svg');

        console.log('categoryName:', categoryName);
        console.log('categorySvg:', categorySvg);
        console.log('userId:', userId);
        const result = await prisma.category.create({
            data: {
                name: categoryName,
                svg: categorySvg as string,
                authorId: userId,
            },
        });

        console.log('result', result);
        // return new Response('Category has been created!', { status: 200 });
    } catch (error) {
        console.log('フォームのデータ', formData);
        console.log('エラー内容', JSON.stringify(error));
        // return new Response('Category Error', { status: 500 });
    }
}
