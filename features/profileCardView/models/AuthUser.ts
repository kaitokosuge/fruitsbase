export type AuthUser = {
    image: string | null;
    name: string | null;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    clerkId: string;
    username: string | null;
    bio: string | null;
    Category: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        color: string | null;
        svg: string | null;
        authorId: string;
    }[];
} | null;
