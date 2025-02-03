/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { usePostImage } from '../../hooks/usePostImage/usePostImage';

export default function ImageForm() {
    const {
        imageUpLoad,
        previewImage,
        savedImage,
        handleFileChange,
        handleSubmit,
    } = usePostImage();
    return (
        <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px] flex text-[#7b7b7b]">
            {imageUpLoad && <>ロード中</>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image" className="text-xs">
                        画像ファイル:
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="rounded-md  "
                        required
                    />
                </div>
                {previewImage && (
                    <img
                        src={previewImage}
                        className="block rounded-full bg-black object-contain w-[75px] h-[75px]"
                    />
                )}

                <button
                    type="submit"
                    disabled={imageUpLoad}
                    className="block md:text-sm text-xs bg-[#313131] duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold"
                >
                    アップロード
                </button>
            </form>
            {savedImage && (
                <div className="">
                    <img
                        src={savedImage}
                        alt="profile image"
                        className="block rounded-full bg-black object-contain w-[35px] h-[35px]"
                    />
                </div>
            )}
        </div>
    );
}
