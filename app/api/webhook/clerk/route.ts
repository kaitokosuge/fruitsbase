import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
            'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
        );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        });
    }

    // Get body
    const payload = await req.json();
    console.log('payloadです。ここがnullかも', payload);
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error: Could not verify webhook:', err);
        return new Response('Error: Verification error', {
            status: 400,
        });
    }

    // Do something with payload
    // For this guide, log payload to console
    // const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
        console.log('createが動いたよ');

        try {
            const resdata = await JSON.parse(body).data.username;
            if (resdata === null) {
                const userRecord = await prisma.user.create({
                    data: {
                        id: evt.data.id,
                        clerkId: evt.data.id,
                        image: JSON.parse(body).data.image_url,
                        username: JSON.parse(body).data.first_name,
                        name: uuidv4(),
                        email: JSON.parse(body).data.email_addresses[0]
                            .email_address,
                    },
                });
                console.log('ユーザー情報の保存結果', userRecord);
                return new Response('User has been created!', { status: 200 });
            }
            const userRecord = await prisma.user.create({
                data: {
                    id: evt.data.id,
                    clerkId: evt.data.id,
                    image: JSON.parse(body).data.image_url,
                    username: JSON.parse(body).data.username,
                    name: uuidv4(),
                    email: JSON.parse(body).data.email_addresses[0]
                        .email_address,
                },
            });
            console.log('ユーザー情報の保存結果', userRecord);
            return new Response('User has been created!', { status: 200 });
        } catch (err) {
            console.log('ユーザー作成に失敗しました');

            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                console.log('Prisma エラーコード:', err.code);
            }

            const client = await clerkClient();
            let deleted = false;
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const deleteUser = await client.users.deleteUser(
                        evt.data.id,
                    );
                    console.log('削除すべきユーザーレコード', deleteUser);
                    deleted = true;
                    break; //成功したら抜ける
                } catch (deleteErr) {
                    console.log(
                        `ユーザー削除失敗 (試行 ${attempt + 1}/3):`,
                        deleteErr,
                    );
                }
            }
            if (!deleted) {
                console.log(
                    '最終試行でも削除できませんでした。手動対応が必要です。',
                );
            }
            return;
        }
    }

    if (eventType === 'user.deleted') {
        console.log('deleteが動いたよ');
        try {
            await prisma.user.delete({
                where: {
                    id: evt.data.id,
                },
            });
            return new Response('User has been deleted', { status: 200 });
        } catch (error) {
            console.log('ユーザーデータの削除に失敗しました');
            console.log('catchしたエラー', error);
            return new NextResponse('Filed to deleted the user!', {
                status: 500,
            });
        }
    }
    return new NextResponse('Webhook received', { status: 200 });
}
