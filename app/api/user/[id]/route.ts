import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.url?.split('/').pop();
    const userData = await prisma.user.findFirst({
        where: {
            name: userId,
        },
    });
    if (userData === null) {
        return NextResponse.json({ userData: null });
    }
    return NextResponse.json({ userData: userData });
}
