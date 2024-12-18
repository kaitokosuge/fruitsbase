import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';

export default function Option({
    optionId,
    index,
    handleOptionChange,
}: {
    optionId: number;
    index: number;
    handleOptionChange: (editor: EditorJS, optionId: number) => void;
}) {
    const questionRef = useRef<EditorJS | null>(null);
    //windowオブジェクトが作成されてからeditorインスタンスを作るため、フラグを定義
    const [isWindowMade, setisWindowMade] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setisWindowMade(true);
        }
        if (isWindowMade) {
            const optionEditor = new EditorJS({
                holder: String(optionId),
                onReady() {
                    questionRef.current = optionEditor;
                },
                placeholder: `選択肢${index + 1}`,
                // inlineToolbar: true,
                tools: {
                    code: CodeTool,
                },
                autofocus: false,
                // data,
                onChange: () => handleOptionChange(optionEditor, optionId),
            });
        }
        return () => {
            if (questionRef.current && questionRef.current.destroy) {
                questionRef.current.destroy();
            }
            questionRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWindowMade]);
    return (
        <div>
            <p className="text-gray-500 text-[11px] mx-auto w-[650px]">
                選択肢{index + 1}
            </p>
            <div
                id={String(optionId)}
                className="min-h-[100px] mx-auto lg:w-[1000px]"
            ></div>
        </div>
    );
}
