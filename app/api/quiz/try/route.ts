import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log(req);

    const data = await req.json();
    console.log('送られてきたデータです', data);
    return NextResponse.json({ res: 'success' });
}
