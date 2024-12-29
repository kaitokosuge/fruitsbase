import React from 'react';
import parse from 'html-react-parser';

export default function CategoryArea({ quiz }: { quiz: any }) {
    return (
        <div className="flex items-center">
            {quiz.categories.map((category) => (
                <div
                    key={category.category.name}
                    className="flex items-center border border-[#313131] px-2 py-1 rounded-md ml-1"
                >
                    {category.category.svg && (
                        <div className="small-svg rounded-[5px]">
                            {parse(category.category.svg)}
                        </div>
                    )}
                    <p className="ml-1 text-[11px] font-bold text-gray-400">
                        {category.category.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
