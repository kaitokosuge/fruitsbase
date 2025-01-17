import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { EditorObject } from '../../types/EditorObject';

export default function QuizExplanation({
    explanation,
}: {
    explanation: string;
}) {
    console.log(explanation);
    return (
        <div>
            <p className="text-xs text-gray-300 mt-2">解説</p>
            <div className="mt-2">
                {JSON.parse(explanation).map((item: EditorObject) => (
                    <div key={item.id} className="max-w-full">
                        {'code' in item.data ? (
                            <div className="text-[13px] mt-2 md:w-full w-[340px] mx-auto">
                                <SyntaxHighlighter
                                    language="typescript"
                                    style={atomOneDark}
                                >
                                    {item.data.code}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <div className="mt-2">{item.data.text}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
