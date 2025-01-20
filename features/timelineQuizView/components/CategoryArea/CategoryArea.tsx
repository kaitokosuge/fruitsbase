import { PublicQuiz } from '@/models/PublicQuiz';
import React from 'react';

export default function CategoryArea({ quiz }: { quiz: PublicQuiz }) {
    return (
        <div className="flex items-center overflow-x-scroll hidden-scrollbar">
            {quiz.Category_Quiz.map((category) => (
                <div
                    key={category.category.name}
                    className="flex items-center border border-[#313131] px-2 py-1 rounded-md mr-1"
                >
                    <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                        {category.category.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
