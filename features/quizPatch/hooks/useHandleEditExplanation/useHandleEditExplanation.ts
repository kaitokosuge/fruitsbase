'use cleint';
import { useState } from 'react';
import EditorJS from '@editorjs/editorjs';

export const useHandleEditExplanation = (currentExplanationText: string) => {
    const [explanationText, setExplanationText] = useState<string>(
        currentExplanationText,
    );
    const handleInputExChange = (editor: EditorJS) => {
        editor.save().then((editorObj) => {
            const strEditorData = JSON.stringify(editorObj.blocks);
            setExplanationText(strEditorData);
        });
    };

    return { explanationText, handleInputExChange, setExplanationText };
};
