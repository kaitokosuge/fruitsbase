import { useState } from 'react';

export const useTryQuiz = () => {
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
    const [tryingQuizId, setTryingQuizId] = useState<string | null>();
    const handleClickOption = (optionId: string, quizId: string) => {
        if (tryingQuizId === null) {
            setTryingQuizId(quizId);
        } else if (tryingQuizId !== quizId) {
            setTryingQuizId(quizId);
            setSelectedOptionIds([]);
        }
        if (selectedOptionIds.some((option: string) => option === optionId)) {
            setSelectedOptionIds(
                selectedOptionIds.filter((option) => option !== optionId),
            );
        } else {
            setSelectedOptionIds((prev) => {
                return [...prev, optionId];
            });
        }
    };
    return { selectedOptionIds, handleClickOption };
};
