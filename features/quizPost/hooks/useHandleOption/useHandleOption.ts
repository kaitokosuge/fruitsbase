'use client';
import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { useState } from 'react';
import { QuizOption } from '../../models/QuizOption';

export type DataItem = {
    id: string | undefined;
    type: string;
    data: Record<string, string>;
};
export type OptionObj = Record<number, DataItem[]>;

export const useHandleOption = () => {
    const [optionText, setOptionText] = useState<OptionObj>({});

    const [options, setOptions] = useState<QuizOption[]>([
        { text: '', is_correct: true, id: 1 },
        { text: '', is_correct: true, id: 2 },
    ]);

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

                const updatedItems = existingItems.filter((item) =>
                    newItems.some((newItem) => newItem.id === item.id),
                );

                // 更新処理：既存データをマージまたは上書き
                const mergedItems = newItems.map((newItem) => {
                    const existingItem = updatedItems.find(
                        (item) => item.id === newItem.id,
                    );
                    return existingItem
                        ? { ...existingItem, ...newItem } // 既存データを上書き
                        : newItem; // 新規データを追加
                });

                // 新しい状態を返す
                return {
                    ...prevState,
                    [optionId]: mergedItems,
                };
            });
            setOptions((prevOptions) => {
                return prevOptions.map((option) => {
                    if (option.id === optionId) {
                        // 該当する `option` の `text` を更新
                        return {
                            ...option,
                            text: JSON.stringify(newItems, null, 2), // DataItem[] を文字列化して格納
                        };
                    }
                    return option;
                });
            });
        });
    };
    const handleChangeIsCorrect = (value: string, optionId: number) => {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option.id === optionId) {
                    const isCorrect = false;
                    if (value === 'true') {
                        const isCorrect = true;
                        return {
                            ...option,
                            is_correct: isCorrect,
                        };
                    }
                    return {
                        ...option,
                        is_correct: isCorrect,
                    };
                }
                return option;
            });
        });
    };
    //todo test->既存でないidを生成するか
    const addOption = () => {
        const usedIds = new Set(options.map((option: QuizOption) => option.id));

        const maxIds = 6;
        let newId: number | null = null;

        for (let i = 1; i <= maxIds; i++) {
            if (!usedIds.has(i)) {
                newId = i;
                break;
            }
        }
        if (newId !== null) {
            const newOption: QuizOption = {
                text: '',
                is_correct: true,
                id: newId,
            };
            setOptions((prevOptions) => [...prevOptions, newOption]);
        } else {
            alert('不正な操作です');
        }
    };
    ////todo test->指定したidが削除された配列になるか
    const removeOption = (id: number) => {
        if (options.length <= 2) {
            alert('選択肢は2つ必要です');
            return;
        }
        setOptions((prevOptions) =>
            prevOptions.filter((option) => option.id !== id),
        );
    };
    return {
        optionText,
        setOptionText,
        addOption,
        removeOption,
        handleOptionChange,
        handleChangeIsCorrect,
        options,
        setOptions,
    };
};
