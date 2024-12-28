'use client';
import React from 'react';
import { submitCategory } from './actions/postCategory';
import CategoryForm from './components/CategoryForm';

export default function CategoryPost() {
    return (
        <div>
            <p>カテゴリを追加する</p>
            <form action={submitCategory} className="text-black">
                <CategoryForm />
            </form>
        </div>
    );
}
