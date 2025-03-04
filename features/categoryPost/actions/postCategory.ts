'use server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function submitCategory(formData: FormData): Promise<void> {
    await sleep(500);
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

        const result = await prisma.category.create({
            data: {
                name: categoryName,
                authorId: userId,
            },
        });
        console.log('result', result);
    } catch (error) {
        console.log('フォームのデータ', formData);
        console.log('エラー内容', JSON.stringify(error));
    }
}
