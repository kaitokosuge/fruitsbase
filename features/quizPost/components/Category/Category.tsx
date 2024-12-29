import React from 'react';
import parse from 'html-react-parser';

export default function Category({
    categories,
    handleClickCategory,
}: {
    categories: {
        id: string;
        name: string;
        color: string | null;
        svg: string | null;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    handleClickCategory: (id: string) => void;
}) {
    return (
        <div className="mt-5">
            <p className="w-[650px] mx-auto text-gray-500 text-xs pt-4 border-t border-[#252525]">
                カテゴリ
            </p>
            <div className="w-[670px] mx-auto flex items-center overflow-scroll py-5">
                {categories.map((item) => (
                    <button
                        id={item.id}
                        onClick={() => handleClickCategory(item.id)}
                        key={item.id}
                        className="flex items-center px-2 py-1 border border-[#363636] w-fit rounded-md ml-2"
                    >
                        <div className="">
                            {item.svg && (
                                <>
                                    <div className="w-full object-contain small-svg">
                                        {parse(item.svg)}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="ml-1 text-[13px] text-gray-500 whitespace-nowrap">
                            {item.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
