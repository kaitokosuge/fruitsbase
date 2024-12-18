'use cleint';
import { useState } from 'react';
import EditorJS from '@editorjs/editorjs';

export const useHandleInputExplanation = () => {
    const [inputExText, setInputExText] = useState<string>('{}');
    const handleInputExChange = (editor: EditorJS) => {
        editor.save().then((editorObj) => {
            console.log(editorObj);
            const strEditorData = JSON.stringify(editorObj.blocks);
            setInputExText(strEditorData);
        });
    };

    return { inputExText, handleInputExChange };
};
