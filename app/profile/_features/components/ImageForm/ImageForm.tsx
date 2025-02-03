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
        <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px] flex text-[#7b7b7b]">
            {imageUpLoad && <>ロード中</>}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full">
                    <label htmlFor="image" className="text-md font-bold">
                        プロフィール画像
                    </label>
                    <div className="flex items-center w-full">
                        {viewImage && (
                            <img
                                src={viewImage}
                                alt="profile"
                                className="w-[150px] h-[150px] rounded-full object-cover mt-2"
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="rounded-md block ml-10"
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
                    className="mt-5 block md:text-sm text-xs bg-[#313131] duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold"
                >
                    アップロード
                </button>
            </form>
        </div>
    );
}
