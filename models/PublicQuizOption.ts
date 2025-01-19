//クイズ一覧（ユーザーが解く時）の型のため、is_correctを抜粋
export type PublicQuizOption = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    option: string;
    quizId: string;
}[];
