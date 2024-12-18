'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import { useHandleInputEditor } from '../../hooks/useHandleInputEditor/useHandleInputEditor';

export default function QuestionEditor({
    id,
    placeholder,
    handleInputChange,
}: {
    id: string;
    placeholder: string;
    handleInputChange: (editor: EditorJS) => void;
}) {
    const { inputText } = useHandleInputEditor();

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
                autofocus: true,
                data: JSON.parse(inputText),
                onChange: () => handleInputChange(questionEditor),
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
        <div className="mx-auto">
            {inputText !== '{}' && (
                <p className="text-gray-500 text-[11px] mx-auto w-[650px]">
                    クイズ本文
                </p>
            )}
            <div
                id={editorId}
                className="mx-auto lg:w-[1000px] min-h-[150px]"
            ></div>
        </div>
    );
}
