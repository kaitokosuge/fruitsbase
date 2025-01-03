export type QuizOption = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    option: string;
    quizId: string;
    is_correct: boolean;
}[];
