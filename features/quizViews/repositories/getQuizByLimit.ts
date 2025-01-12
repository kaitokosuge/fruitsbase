import { Quiz } from '@/models/Quiz';

export const getQuizByLimit = async (callNum: number) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/quiz?page=${callNum}`,
        {
            method: 'GET',
            next: { revalidate: 60 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        alert('取得に失敗しました:rep');
    }
    const data: { quizzes: Quiz[] } = await res.json();
    return data.quizzes;
};
