'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import { useHandleEditQuestion } from '../../hooks/useHandleEditQuestion/useHandleEditQuestion';

export default function QuestionEditor({
    id,
    placeholder,
    handleInputChange,
    currentQuestionText,
}: {
    id: string;
    placeholder: string;
    handleInputChange: (editor: EditorJS) => void;
    currentQuestionText: string;
}) {
    const { questionText } = useHandleEditQuestion(currentQuestionText);

    const questionRef = useRef<EditorJS | null>(null);
    //windowオブジェクトが作成されてからeditorインスタンスを作るため、フラグを定義
    const [isWindowMade, setisWindowMade] = useState(false);
    const editorId = id;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setisWindowMade(true);
        }
        if (isWindowMade) {
            const editQuestionEditor = new EditorJS({
                holder: id,
                onReady() {
                    questionRef.current = editQuestionEditor;
                },
                placeholder: placeholder,
                inlineToolbar: true,
                tools: {
                    code: CodeTool,
                },
                autofocus: true,
                data: {
                    time: 10000,
                    blocks: JSON.parse(questionText),
                    version: '2^',
                },
                onChange: () => handleInputChange(editQuestionEditor),
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
    // border-t border-[#252525]
    return (
        <div className="mx-auto min-h-[150px]">
            <p className="sm:w-[650px] w-[350px] mx-auto text-gray-500 text-xs pt-4">
                クイズ本文
            </p>
            <div
                id={editorId}
                className="mx-auto w-[350px] sm:w-[600px] lg:w-[1000px] min-h-[150px]"
            ></div>
        </div>
    );
}
