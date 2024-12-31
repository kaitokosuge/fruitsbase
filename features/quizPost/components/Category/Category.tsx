import React from 'react';
import parse from 'html-react-parser';

export default function Category({
    categories,
    handleClickCategory,
    selectedIds,
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
    selectedIds: string[];
}) {
    return (
        <div className="md:pt-[80px] pt-[50px]">
            <p className="sm:w-[650px] w-[350px] mx-auto text-gray-500 text-xs pt-4">
                カテゴリ
            </p>
            <div className="sm:w-[670px] w-[360px] mx-auto flex items-center overflow-scroll py-5">
                {categories.map((item) => (
                    <button
                        id={item.id}
                        onClick={() => handleClickCategory(item.id)}
                        key={item.id}
                        className={
                            selectedIds.some((id) => item.id === id)
                                ? 'duration-200 bg-blue-950 text-white flex items-center px-2 py-1 border border-[#707070] w-fit rounded-md ml-2'
                                : 'duration-200 hover:bg-blue-950 hover:text-white text-gray-500 flex items-center px-2 py-1 border border-[#363636] w-fit rounded-md ml-2'
                        }
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
                        <div className="ml-1 text-[13px] whitespace-nowrap">
                            {item.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
