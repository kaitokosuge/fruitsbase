import React from 'react';
import parse from 'html-react-parser';

export default function Category({
    categories,
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
}) {
    return (
        <div>
            <p className="w-[670px] mx-auto text-gray-400">カテゴリ</p>
            <div className="w-[670px] mx-auto flex items-center overflow-scroll py-5">
                {categories.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center px-2 py-1 border border-gray-600 w-fit rounded-md ml-4"
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
                        <div className="ml-1 text-[13px] text-gray-500">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
