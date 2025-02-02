import { User } from '@/models/User';

export const getUserData = async (id: string): Promise<User | null> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/${id}`,
        {
            method: 'GET',
            next: { revalidate: 3 },
            headers: {
                token: 'fruitsbase',
            },
        },
    );
    if (!res.ok) {
        return null;
    }
    const data: { userData: User } = await res.json();
    return data.userData;
};
