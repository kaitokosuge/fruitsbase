/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { usePostImage } from '../../_features/hooks/usePostImage/usePostImage';

export default function Page() {
    const {
        imageUpLoad,
        previewImage,
        savedImage,
        handleFileChange,
        handleSubmit,
    } = usePostImage();
    return (
        <div className="bg-[#171717] text-[#F0F0F0] md:pt-20 pt-[50px] w-[90%] mx-auto">
            <h2 className="font-mono font-bold pt-10">プロフィールの編集</h2>
            <div>
                {imageUpLoad && <>ロード中</>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="image">画像ファイル:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    {previewImage && (
                        <img
                            src={previewImage}
                            className="block rounded-full bg-black object-contain w-[75px] h-[75px]"
                        />
                    )}

                    <button type="submit" disabled={imageUpLoad}>
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
        </div>
    );
}
