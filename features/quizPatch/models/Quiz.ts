export type Quiz = {
    question: string;
    explanation: string;
    options: { text: string; is_correct: boolean }[];
    userId: string;
};
