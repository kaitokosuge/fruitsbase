'use client';
import EditorJS from '@editorjs/editorjs';
import { useState } from 'react';
type DataItem = {
    id: string;
    type: string;
    data: Record<string, string>;
};
type OptionObj = Record<number, DataItem[]>;

export const useHandleOption = () => {
    const [optionText, setOptionText] = useState<OptionObj>({});
    const handleOptionChange = (editor: EditorJS, optionId: number) => {
        editor.save().then((editorObj) => {
            console.log('毎回送られるID', optionId);
            console.log('毎回送られるOBJ', editorObj);
            console.log('objobj', editorObj.blocks);
            const newItems: DataItem[] = editorObj.blocks.map((block: any) => ({
                id: block.id,
                type: block.type,
                data: block.data,
            }));

            setOptionText((prevState) => {
                const existingItems = prevState[optionId] || [];

                // 更新処理：既存データをマージまたは上書き
                const updatedItems = newItems.map((newItem) => {
                    const existingItem = existingItems.find(
                        (item) => item.id === newItem.id,
                    );
                    return existingItem
                        ? { ...existingItem, ...newItem } // 既存データを上書き
                        : newItem; // 新規データを追加
                });

                // 新しい状態を返す
                return {
                    ...prevState,
                    [optionId]: [
                        ...existingItems.filter(
                            (item) =>
                                !newItems.some(
                                    (newItem) => newItem.id === item.id,
                                ),
                        ), // 新しいデータに含まれない既存データを保持
                        ...updatedItems, // 上書きまたは新規追加データ
                    ],
                };
            });
        });
    };
    return { optionText, handleOptionChange };
};

// const obj = {
//     1: [
//         { id: 'kYhvY1bZST', type: 'paragraph', data: { text: '選択肢1' } },
//         {
//             id: 'kYhv4tfZST',
//             type: 'paragraph',
//             data: { text: '選択肢1の続き' },
//         },
//     ],
//     2: [{ id: 'jYhvYsdZSu', type: 'paragraph', data: { text: '選択肢2' } }],
//     3: [
//         { id: 'asdfY1bZSf', type: 'paragraph', data: { text: '選択肢3' } },
//         {
//             id: 'oknfY1bZSf',
//             type: 'paragraph',
//             data: { text: '選択肢3の続き' },
//         },
//     ],
//     4: [{ id: 'iYhvY1bodg', type: 'paragraph', data: { text: '選択肢4' } }],
// };
