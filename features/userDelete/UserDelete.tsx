import React from 'react';
import { deleteUser } from './repositories/deleteUser';

export default function UserDelete() {
    return (
        <button
            onClick={() => {
                const isDelete = confirm(
                    'アカウントを削除しますか？削除すると関連するリソース（投稿したクイズ等）は全て削除されます',
                );
                if (!isDelete) {
                    return;
                }
                deleteUser();
            }}
            className="mt-5 text-red-500 border border-red-500 rounded-md px-3 py-2 opacity-30 hover:opacity-100 duration-300"
        >
            アカウントを削除する
        </button>
    );
}
