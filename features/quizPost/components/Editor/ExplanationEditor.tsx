'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';

import { useHandleInputExplanation } from '../../hooks/useHandleInputExplanation/useHandleInputExplanation';

export default function ExplanationEditor({
    id,
    placeholder,
    handleInputExChange,
}: {
    id: string;
    placeholder: string;
    handleInputExChange: (editor: EditorJS) => void;
}) {
    const { inputExText } = useHandleInputExplanation();

    const questionRef = useRef<EditorJS | null>(null);
    //windowオブジェクトが作成されてからeditorインスタンスを作るため、フラグを定義
    const [isWindowMade, setisWindowMade] = useState(false);
    const editorId = id;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setisWindowMade(true);
        }
        if (isWindowMade) {
            const questionEditor = new EditorJS({
                holder: id,
                onReady() {
                    questionRef.current = questionEditor;
                },
                placeholder: placeholder,
                inlineToolbar: true,
                tools: {
                    code: CodeTool,
                },
                autofocus: false,
                data: JSON.parse(inputExText),
                onChange: () => handleInputExChange(questionEditor),
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
        <div className="mx-auto mt-10">
            <p className="border-t mx-auto w-[650px] border-[#252525] pt-2 text-gray-500">
                クイズ解説
            </p>
            <div
                id={editorId}
                className="mx-auto lg:w-[1000px] min-h-[300px]"
            ></div>
        </div>
    );
}
