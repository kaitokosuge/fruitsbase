'use client';
import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { useState } from 'react';
// import { QuizOption } from '../../models/QuizOption';
import { QuizOption } from '@/models/QuizOption';
import { FeaturesEditOption } from '../../models/FeaturesEditOption';

export type DataItem = {
    id: string | undefined;
    type: string;
    data: Record<string, string>;
};
export type OptionObj = Record<number, DataItem[]>;

export const useHandleEditOption = (currentOptions: QuizOption) => {
    const [optionText, setOptionText] = useState<OptionObj>({});
    const editOptions = currentOptions.map((item, index) => ({
        id: item.id,
        stateId: index + 1,
        text: item.option,
        is_correct: item.is_correct,
    }));
    const [options, setOptions] = useState<FeaturesEditOption[]>(editOptions);

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
                    if (option.stateId === optionId) {
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
                if (option.stateId === optionId) {
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

    return {
        optionText,
        setOptionText,
        handleOptionChange,
        handleChangeIsCorrect,
        options,
        setOptions,
    };
};
