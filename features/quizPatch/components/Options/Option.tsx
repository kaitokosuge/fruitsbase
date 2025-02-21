import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import { FeaturesOption } from '../../models/FeaturesOption';

export default function Option({
    option,
    index,
    handleOptionChange,
    handleChangeIsCorrect,
    removeOption,
}: {
    options: FeaturesOption[];
    option: FeaturesOption;
    index: number;
    handleOptionChange: (editor: EditorJS, optionId: number) => void;
    handleChangeIsCorrect: (value: string, number: number) => void;
    removeOption: (id: number) => void;
}) {
    const optionRef = useRef<EditorJS | null>(null);
    //windowオブジェクトが作成されてからeditorインスタンスを作るため、フラグを定義
    const [isWindowMade, setisWindowMade] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setisWindowMade(true);
        }
        if (isWindowMade) {
            const optionEditor = new EditorJS({
                holder: String(option.id),
                onReady() {
                    optionRef.current = optionEditor;
                },
                placeholder: `選択肢`,
                tools: {
                    code: CodeTool,
                },
                autofocus: false,
                data: {
                    time: 10000,
                    blocks: JSON.parse(option.text),
                    version: '2^',
                },
                onChange: () => handleOptionChange(optionEditor, option.id),
            });
        }
        return () => {
            if (optionRef.current && optionRef.current.destroy) {
                optionRef.current.destroy();
            }
            optionRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWindowMade]);
    return (
        <div className="mt-5">
            <div className="flex mx-auto items-center sm:w-[650px] w-[350px] justify-between border-t border-[#252525] pt-2">
                <p className="text-gray-500 text-[14px] min-w-[100px]">
                    選択肢{index + 1}
                </p>
                <div className="flex items-center">
                    <p className="text-gray-600 text-[11px]">正誤</p>
                    <select
                        onChange={(e) =>
                            handleChangeIsCorrect(e.target.value, option.id)
                        }
                        name="pets"
                        id="pet-select"
                        className="font-bold bg-[#333333] ml-3 rounded-md px-3 py-1 text-[21px] text-gray-300 focus:outline-none"
                    >
                        <option value="true">◎</option>
                        <option value="false">×</option>
                    </select>
                    <button
                        onClick={() => removeOption(option.id)}
                        className="ml-2 text-[12px] bg-[#333333] px-4 py-2 rounded-md text-gray-400"
                    >
                        削除
                    </button>
                </div>
            </div>

            <div
                id={String(option.id)}
                className="min-h-[100px] mx-auto w-[350px] sm:w-[600px] lg:w-[1000px] text-gray-300"
            ></div>
        </div>
    );
}
