import prisma from '@/lib/prisma';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const {
    CLOUDFLARE_ACCESS_KEY_ID,
    CLOUDFLARE_ACCESS_KEY,
    CLOUDFLARE_ENDPOINT,
    BUCKET_NAME,
} = process.env;

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return;
    }
    const formData = await req.formData();
    const image = formData.get('image') as File;

    const s3Client = new S3Client({
        region: 'auto',
        endpoint: CLOUDFLARE_ENDPOINT,
        credentials: {
            accessKeyId: CLOUDFLARE_ACCESS_KEY_ID as string,
            secretAccessKey: CLOUDFLARE_ACCESS_KEY as string,
        },
    });

    const fileName = `${Date.now()}-${userId}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
        ACL: 'public-read',
    });

    await s3Client.send(command);
    const imageUrl = `${process.env.HOST_URL}/${fileName}`;

    const userNewImage = await prisma.user.update({
        where: { id: userId },
        data: {
            image: imageUrl,
        },
    });

    return NextResponse.json(userNewImage);
}
