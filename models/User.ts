export type User = {
    image: string | null;
    username: string | null;
    name: string | null;
    id: string;
    email: string;
    clerkId: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null;
