/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { usePostImage } from '../../hooks/usePostImage/usePostImage';

export default function ImageForm({
    userImage,
}: {
    userImage: string | null | undefined;
}) {
    const {
        imageUpLoad,
        previewImage,
        viewImage,
        handleFileChange,
        handleSubmit,
    } = usePostImage(userImage);

    return (
        <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px] flex text-[#7b7b7b] mt-5 pb-5 border-b border-[#515151]">
            {imageUpLoad && <>ロード中</>}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full">
                    <label htmlFor="image" className="text-md font-bold">
                        プロフィール画像
                    </label>
                    <div className="flex items-center w-full mt-3">
                        {viewImage && (
                            <img
                                src={viewImage}
                                alt="profile"
                                className="min-w-[150px] min-h-[150px] max-h-[150px] max-w-[150px] rounded-full object-cover mt-2"
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="rounded-md block md:ml-10 ml-5 text-xs file:w-[150px] file:block w-fit file:bg-[#313131] file:text-white file:mb-3 file:px-3 file:py-2 file:rounded-md file:border-none file:cursor-pointer file:duration-300 file:hover:opacity-70"
                            required
                        />
                    </div>
                </div>
                {previewImage && (
                    <div className="flex items-center">
                        <img
                            src={previewImage}
                            className="w-[150px] h-[150px] rounded-full object-cover mt-2"
                        />
                        <p className="ml-10">新しいプロフィール画像</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={imageUpLoad}
                    className={
                        imageUpLoad
                            ? 'mt-5 block md:text-sm text-xs bg-[#313131] duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold'
                            : 'mt-5 block md:text-sm text-xs bg-[#313131] text-white duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold'
                    }
                >
                    アップロード
                </button>
            </form>
        </div>
    );
}
