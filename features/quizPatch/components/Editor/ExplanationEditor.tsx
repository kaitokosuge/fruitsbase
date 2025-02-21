'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';

import { useHandleEditExplanation } from '../../hooks/useHandleEditExplanation/useHandleEditExplanation';

export default function ExplanationEditor({
    id,
    placeholder,
    handleInputExChange,
    currentExplanationText,
}: {
    id: string;
    placeholder: string;
    handleInputExChange: (editor: EditorJS) => void;
    currentExplanationText: string;
}) {
    const { explanationText } = useHandleEditExplanation(
        currentExplanationText,
    );

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
                data: {
                    time: 10000,
                    blocks: JSON.parse(explanationText),
                    version: '2^',
                },
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
            <p className="sm:w-[650px] w-[350px] border-t mx-auto border-[#252525] pt-2 text-gray-500">
                クイズ解説
            </p>
            <div
                id={editorId}
                className="mx-auto w-[350px] sm:w-[600px] lg:w-[1000px] min-h-[300px]"
            ></div>
        </div>
    );
}
