import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import parse from 'html-react-parser';

export default async function CategoryViews() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const categories = await prisma.category.findMany({
        where: {
            authorId: userId,
        },
    });
    console.log(categories);
    return (
        <div>
            {categories.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center px-2 py-1 border border-gray-600 w-fit rounded-md"
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
                    <div className="ml-1">{item.name}</div>
                </div>
            ))}
        </div>
    );
}
