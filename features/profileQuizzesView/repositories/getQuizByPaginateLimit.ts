import { Quiz } from '@/models/Quiz';

export const getQuizByPaginateLimit = async (
    paginateIndex: number,
    userId: string,
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/${userId}/quizzes?page=${paginateIndex}`,
        {
            method: 'GET',
            next: { revalidate: 60 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        return;
    }
    const data: { quizzes: Quiz[]; quizCount: number } = await res.json();
    return data;
};
