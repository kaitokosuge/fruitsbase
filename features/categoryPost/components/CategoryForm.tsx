import React from 'react';
import { useFormStatus } from 'react-dom';

export default function CategoryForm() {
    const { pending } = useFormStatus();
    return (
        <div className="text-white">
            <input
                type="text"
                placeholder="カテゴリ名"
                name="name"
                className="block focus:outline-none bg-[#232323] px-2 py-1 border-b border-b-[#404040] w-full"
            />
            <input
                type="text"
                placeholder="svgデータ"
                name="svg"
                className="mt-3 block focus:outline-none bg-[#232323] px-2 py-1 border-b border-b-[#404040] w-full"
            />
            <button
                type="submit"
                disabled={pending}
                className={
                    pending
                        ? 'opacity-50 text-white text-sm rounded-md px-2 py-1 w-fit cursor-pointer mt-2'
                        : 'opacity-100 text-white text-sm rounded-md px-2 py-1 w-fit cursor-pointer mt-2'
                }
            >
                追加する
            </button>
        </div>
    );
}
