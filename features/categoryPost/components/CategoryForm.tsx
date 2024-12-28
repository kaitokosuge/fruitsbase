import React from 'react';
import { useFormStatus } from 'react-dom';

export default function CategoryForm() {
    const { pending } = useFormStatus();
    return (
        <div>
            <input type="text" placeholder="カテゴリ名" name="name" />
            <input type="text" placeholder="svgデータ" name="svg" />
            <button
                type="submit"
                disabled={pending}
                className={
                    pending ? 'opacity-50 text-white' : 'opacity-100 text-white'
                }
            >
                追加する
            </button>
        </div>
    );
}
