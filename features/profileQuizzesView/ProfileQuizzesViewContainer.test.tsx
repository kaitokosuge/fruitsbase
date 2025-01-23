import { beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import ProfileQuizzesViewContainer from './ProfileQuizzesViewContainer';

beforeEach(() => {
    global.fetch = vi.fn();
    cleanup();
    vi.mock('@clerk/nextjs/server', () => ({
        auth: vi.fn().mockResolvedValue({
            userId: 'self-user-id',
        }),
    }));
});

it('認証済みの際、自身のプロフィールページではAuthQuizzesViewが表示される', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
            quizzes: [
                {
                    id: 'cm63el4810001js0382va6gv2',
                    question:
                        '[{"id":"M_owrUX3SU","type":"paragraph","data":{"text":"prismaを使い、idが1,2,3,4,5,6,7...と自然数で続くpostsテーブルのデータを以下のように取得する際、取得できるデータのidは？"}},{"id":"qi3ylS6nEo","type":"code","data":{"code":"const posts = await prisma.post.findMany({\\n  skip: 2,\\n  take: 4,\\n})"}}]',
                    authorId: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                    createdAt: '2025-01-19T09:16:42.529Z',
                    updatedAt: '2025-01-19T09:16:42.529Z',
                    Category_Quiz: [],
                    author: {
                        id: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                        clerkId: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                        username: 'kaitokosuge',
                        name: null,
                        bio: null,
                        image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18ycmVWSjFwMUNJVzZvbHR0S09saWxEcnduVVAifQ',
                        createdAt: '2025-01-15T05:37:32.304Z',
                        updatedAt: '2025-01-15T05:37:32.304Z',
                        email: 'kaitokosuge.mi@gmail.com',
                    },
                    Option: [
                        {
                            id: 'cm63el4gf0003js03ab4jgbyr',
                            option: '[\n  {\n    "id": "3QdfiPaZVa",\n    "type": "paragraph",\n    "data": {\n      "text": "id"\n    }\n  },\n  {\n    "id": "e-pWp4CiSn",\n    "type": "code",\n    "data": {\n      "code": "3,4,5,6"\n    }\n  }\n]',
                            quizId: 'cm63el4810001js0382va6gv2',
                            createdAt: '2025-01-19T09:16:42.832Z',
                            updatedAt: '2025-01-19T09:16:42.832Z',
                        },
                        {
                            id: 'cm63el4os0005js0352s6pa2n',
                            option: '[\n  {\n    "id": "O-nyy8Ykvf",\n    "type": "paragraph",\n    "data": {\n      "text": "id"\n    }\n  },\n  {\n    "id": "p4qT4ADfud",\n    "type": "code",\n    "data": {\n      "code": "4,5,6,7"\n    }\n  }\n]',
                            quizId: 'cm63el4810001js0382va6gv2',
                            createdAt: '2025-01-19T09:16:43.133Z',
                            updatedAt: '2025-01-19T09:16:43.133Z',
                        },
                    ],
                },
            ],
            quizCount: 1,
        }),
    } as Response);
    console.log('Test 1 fetch called');

    const result = await ProfileQuizzesViewContainer({
        paramId: 'self-user-id',
    });

    render(result);
    await waitFor(() => {
        expect(screen.getByText('kaitokosuge')).toBeInTheDocument();
    });
});

it('認証済みの際、自身以外のプロフィールページではQuizzesViewが表示される', async () => {
    // cleanup();
    vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
            quizzes: [
                {
                    id: 'cm63el4810001js0382va6gv2',
                    question:
                        '[{"id":"M_owrUX3SU","type":"paragraph","data":{"text":"postsテーブルのデータを以下のように取得する際、取得できるデータのidは？"}},{"id":"qi3ylS6nEo","type":"code","data":{"code":"const posts = await prisma.post.findMany({\\n  skip: 2,\\n  take: 4,\\n})"}}]',
                    authorId: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                    createdAt: '2025-01-19T09:16:42.529Z',
                    updatedAt: '2025-01-19T09:16:42.529Z',
                    Category_Quiz: [],
                    author: {
                        id: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                        clerkId: 'user_2reVIyzgQdI96lZMGZJqKfa3Y94',
                        username: 'kaitokosuge2',
                        name: null,
                        bio: null,
                        image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18ycmVWSjFwMUNJVzZvbHR0S09saWxEcnduVVAifQ',
                        createdAt: '2025-01-15T05:37:32.304Z',
                        updatedAt: '2025-01-15T05:37:32.304Z',
                        email: 'kaitokosuge.mi@gmail.com',
                    },
                    Option: [
                        {
                            id: 'cm63el4gf0003js03ab4jgbyr',
                            option: '[\n  {\n    "id": "3QdfiPaZVa",\n    "type": "paragraph",\n    "data": {\n      "text": "id"\n    }\n  },\n  {\n    "id": "e-pWp4CiSn",\n    "type": "code",\n    "data": {\n      "code": "3,4,5,6"\n    }\n  }\n]',
                            quizId: 'cm63el4810001js0382va6gv2',
                            createdAt: '2025-01-19T09:16:42.832Z',
                            updatedAt: '2025-01-19T09:16:42.832Z',
                        },
                        {
                            id: 'cm63el4os0005js0352s6pa2n',
                            option: '[\n  {\n    "id": "O-nyy8Ykvf",\n    "type": "paragraph",\n    "data": {\n      "text": "id"\n    }\n  },\n  {\n    "id": "p4qT4ADfud",\n    "type": "code",\n    "data": {\n      "code": "4,5,6,7"\n    }\n  }\n]',
                            quizId: 'cm63el4810001js0382va6gv2',
                            createdAt: '2025-01-19T09:16:43.133Z',
                            updatedAt: '2025-01-19T09:16:43.133Z',
                        },
                    ],
                },
            ],
            quizCount: 1,
        }),
    } as Response);

    const result = await ProfileQuizzesViewContainer({
        paramId: 'other-user-id',
    });

    render(result);

    await waitFor(() => {
        expect(screen.getByText('kaitokosuge2')).toBeInTheDocument();
    });
});
