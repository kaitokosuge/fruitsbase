import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import { FeaturesEditOption } from '../../models/FeaturesEditOption';

export default function Option({
    option,
    index,
    handleOptionChange,
    handleChangeIsCorrect,
}: {
    options: FeaturesEditOption[];
    option: FeaturesEditOption;
    index: number;
    handleOptionChange: (editor: EditorJS, optionId: number) => void;
    handleChangeIsCorrect: (value: string, number: number) => void;
}) {
    console.log('option text', option.text);
    const optionRef = useRef<EditorJS | null>(null);
    //windowオブジェクトが作成されてからeditorインスタンスを作るため、フラグを定義
    const [isWindowMade, setisWindowMade] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setisWindowMade(true);
        }
        if (isWindowMade) {
            const optionText = option.text || '[]';
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
                    blocks: JSON.parse(optionText),
                    version: '2^',
                },
                onChange: () =>
                    handleOptionChange(optionEditor, option.stateId),
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
                            handleChangeIsCorrect(
                                e.target.value,
                                option.stateId,
                            )
                        }
                        value={option.is_correct.toString()}
                        name="pets"
                        id="pet-select"
                        className="font-bold bg-[#333333] ml-3 rounded-md px-3 py-1 text-[21px] text-gray-300 focus:outline-none"
                    >
                        <option value="true">◎</option>
                        <option value="false">×</option>
                    </select>
                </div>
            </div>

            <div
                id={String(option.id)}
                className="min-h-[100px] mx-auto w-[350px] sm:w-[600px] lg:w-[1000px] text-gray-300"
            ></div>
        </div>
    );
}
