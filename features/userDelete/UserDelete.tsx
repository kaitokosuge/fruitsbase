'use client';
import React from 'react';
import { deleteUser } from './repositories/deleteUser';

export default function UserDelete() {
    return (
        <button
            onClick={() => {
                const isDelete = confirm(
                    'アカウントを削除しますか？削除するとアカウントに関連する全てのリソースは削除され、復元することはできなくなります',
                );
                if (!isDelete) {
                    return;
                }
                deleteUser();
            }}
            className="block mx-auto mt-10 text-red-500 border border-red-500 rounded-md px-3 py-2 opacity-30 hover:opacity-100 duration-300"
        >
            アカウントを削除する
        </button>
    );
}
