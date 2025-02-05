'use client';
import { User } from '@/models/User';
import React, { useState } from 'react';
import { BasicUser } from '../../types/BasicUser';

export default function BasicForm({ userData }: { userData: User }) {
    //nameはid（ユニーク）
    const [basicUserData, setBasicUserData] = useState<BasicUser>({
        username: userData?.username,
        name: userData?.name,
        bio: userData?.bio,
    });
    const [basicLoading, setbasicLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setBasicUserData((prev) => {
                return { ...prev, username: e.target.value };
            });
        }
        if (e.target.name === 'name') {
            setBasicUserData((prev) => {
                return { ...prev, name: e.target.value };
            });
        }
        if (e.target.name === 'bio') {
            setBasicUserData((prev) => {
                return { ...prev, bio: e.target.value };
            });
        }
    };
    const handleSubmit = async () => {
        setbasicLoading(true);
        const res = await fetch('/api/user/edit', {
            method: 'POST',
            body: JSON.stringify(basicUserData),
        });
        if (!res.ok) {
            alert(
                '更新に失敗しました。ユーザーID（URL）に半角英数字を入力しているか確認してください',
            );
            setbasicLoading(false);
        }
        setbasicLoading(false);
    };

    return (
        <div className="mx-auto w-[350px] sm:w-[600px] md:w-[650px]  text-[#7b7b7b] md:mt-10 mt-5 pb-5 border-b border-[#515151]">
            <div className="w-full">
                {basicUserData.username ? (
                    <div className="w-full">
                        <label
                            htmlFor="username"
                            className="text-md font-bold block"
                        >
                            ユーザーネーム
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            required
                            value={basicUserData.username}
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                ) : (
                    <div className="">
                        <label
                            htmlFor="username"
                            className="text-md font-bold block"
                        >
                            ユーザーネーム
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value=""
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                )}
            </div>

            {/* ユーザーID */}
            <div className="w-full mt-5">
                {basicUserData.name ? (
                    <div className="w-full">
                        <label
                            htmlFor="name"
                            className="text-md font-bold block"
                        >
                            ユーザーID(URL)
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={basicUserData.name}
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                ) : (
                    <div className="">
                        <label
                            htmlFor="username"
                            className="text-md font-bold block"
                        >
                            ユーザーID(URL)
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value=""
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                )}
            </div>

            {/* 自己紹介 */}
            <div className="w-full mt-5">
                {basicUserData.bio ? (
                    <div className="w-full">
                        <label
                            htmlFor="bio"
                            className="text-md font-bold block"
                        >
                            自己紹介
                        </label>
                        <input
                            id="bio"
                            type="text"
                            name="bio"
                            required
                            value={basicUserData.bio}
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                ) : (
                    <div className="">
                        <label
                            htmlFor="bio"
                            className="text-md font-bold block"
                        >
                            自己紹介
                        </label>
                        <input
                            id="bio"
                            type="text"
                            name="bio"
                            value=""
                            onChange={(e) => handleChange(e)}
                            className="w-full block mt-2 px-3 py-2 rounded-md bg-transparent border border-[#4f4f4f] text-white focus:outline-none"
                        />
                    </div>
                )}
            </div>
            <div className="flex items-center">
                <button
                    onClick={handleSubmit}
                    className="text-white mt-5 block md:text-sm text-xs bg-[#313131] duration-300 hover:opacity-50 rounded-md px-4 md:py-3 py-2 font-bold"
                >
                    変更する
                </button>
                <div>
                    {basicLoading && (
                        <div className="spinner-box ml-5">
                            <div className="circle-border">
                                <div className="circle-core"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
