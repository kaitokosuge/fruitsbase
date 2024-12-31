'use client';
import React, { useState } from 'react';
import { submitCategory } from './actions/postCategory';
import CategoryForm from './components/CategoryForm';

export default function CategoryPost() {
    const [isShowForm, setIsShowForm] = useState(false);
    const handleClickShow = () => {
        setIsShowForm(!isShowForm);
    };
    return (
        <div className="mt-2">
            <p
                onClick={handleClickShow}
                className="text-sm border border-[#383838] rounded-md px-2 py-1 cursor-pointer"
            >
                {isShowForm ? '閉じる' : 'カテゴリを追加'}
            </p>
            {isShowForm && (
                <form action={submitCategory} className="mt-5">
                    <CategoryForm />
                </form>
            )}
        </div>
    );
}
