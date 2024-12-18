'use client';
import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { useState } from 'react';
type DataItem = {
    id: string | undefined;
    type: string;
    data: Record<string, string>;
};
type OptionObj = Record<number, DataItem[]>;

export const useHandleOption = () => {
    const [optionText, setOptionText] = useState<OptionObj>({});
    const handleOptionChange = (editor: EditorJS, optionId: number) => {
        editor.save().then((editorObj) => {
            const newItems: DataItem[] = editorObj.blocks.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (block: OutputBlockData<string, any>) => ({
                    id: block.id,
                    type: block.type,
                    data: block.data,
                }),
            );
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
