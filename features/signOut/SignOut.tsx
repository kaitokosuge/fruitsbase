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
            className="text-xs mt-5 ml-2 block text-[#727272] hover:text-white duration-300 border border-[#383838] rounded-md px-2 py-1 cursor-pointer w-fit"
        >
            Sign out
        </button>
    );
};
