import React from 'react';
import parse from 'html-react-parser';

export default function CategoryArea({ quiz }: { quiz: any }) {
    return (
        <div className="flex items-center overflow-x-scroll">
            {quiz.categories.map((category) => (
                <div
                    key={category.category.name}
                    className="flex items-center border border-[#313131] px-2 py-1 rounded-md mr-1"
                >
                    {category.category.svg && (
                        <div className="small-svg block">
                            {parse(category.category.svg)}
                        </div>
                    )}
                    <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                        {category.category.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
