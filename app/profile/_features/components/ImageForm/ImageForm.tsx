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
        <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px] flex text-[#7b7b7b] md:mt-10 mt-5 pb-5 border-b border-[#515151]">
            <form onSubmit={handleSubmit} className="w-full mx-auto">
                <div className="">
                    <div className="flex items-center">
                        <label
                            htmlFor="image"
                            className="text-md font-bold block"
                        >
                            プロフィール画像
                        </label>
                        <div>
                            {imageUpLoad && (
                                <div className="spinner-box ml-5">
                                    <div className="circle-border">
                                        <div className="circle-core"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center mt-3 overflow-hidden">
                        {viewImage && (
                            <img
                                src={viewImage}
                                alt="profile"
                                className="min-w-[130px] min-h-[130px] max-h-[130px] max-w-[130px] rounded-full object-cover mt-2"
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="rounded-md block md:ml-10 ml-5 text-xs file:w-[140px] file:block file:bg-[#313131] file:text-white file:mb-3 file:px-3 file:py-2 file:rounded-md file:border-none file:cursor-pointer file:duration-300 file:hover:opacity-70"
                            required
                        />
                    </div>
                </div>
                {previewImage && (
                    <div className="flex items-center">
                        <img
                            src={previewImage}
                            className="w-[130px] h-[130px] rounded-full object-cover mt-2"
                        />
                        <p className="md:ml-10 ml-5 text-xs">
                            新しいプロフィール画像
                        </p>
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
