import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    try {
        const client = await clerkClient();
        await client.users.deleteUser(userId);
        return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
        console.log('削除に失敗', error);
        return NextResponse.json({ error: 'Error deleting user' });
    }
}
