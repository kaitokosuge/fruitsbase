'use cleint';
import { useState } from 'react';
import EditorJS from '@editorjs/editorjs';

export const useHandleInputEditor = () => {
    const [inputText, setInputText] = useState<string>('{}');
    const handleInputChange = (editor: EditorJS) => {
        editor.save().then((editorObj) => {
            const strEditorData = JSON.stringify(editorObj.blocks);
            setInputText(strEditorData);
        });
    };
    return { inputText, handleInputChange };
};
