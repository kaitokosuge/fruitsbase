import { Quiz } from '@/models/Quiz';

export const getQuizByLimit = async (callNum: number) => {
    const res = await fetch(
        `${process.env.APP_URL}/api/quiz?morepage=${callNum}`,
        {
            method: 'GET',
            next: { revalidate: 60 },
        },
    );
    if (!res.ok) {
        alert('取得に失敗しました:rep');
    }
    const data: Quiz[] = await res.json();
    return data;
};
