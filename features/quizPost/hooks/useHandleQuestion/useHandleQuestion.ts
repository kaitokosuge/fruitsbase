'use cleint';
import { useState } from 'react';
import EditorJS from '@editorjs/editorjs';

export const useHandleQuestion = () => {
    const [questionText, setQuestionText] = useState<string>('{}');
    const handleInputChange = (editor: EditorJS) => {
        editor.save().then((editorObj) => {
            const strEditorData = JSON.stringify(editorObj.blocks);
            setQuestionText(strEditorData);
        });
    };
    return { questionText, handleInputChange };
};
