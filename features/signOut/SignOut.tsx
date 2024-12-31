'use client';

import { useClerk } from '@clerk/nextjs';

export const SignOut = () => {
    const { signOut } = useClerk();

    return (
        <button
            onClick={() => {
                const isSignOut = confirm('サインアウトしますか？');
                if (!isSignOut) {
                    return;
                }
                signOut({ redirectUrl: '/' });
            }}
            className="text-xs border rounded-md px-3 py-1 opacity-50 hover:opacity-100 duration-300"
        >
            Sign out→
        </button>
    );
};
