//クイズ一覧（ユーザーが解く時）の型のため、is_correctを抜粋したPublicQuizOptionを利用し、explanationを抜粋
import { PublicQuizOption } from './PublicQuizOption';
import { QuizAuthor } from './QuizAuthor';
import { QuizCategoryArray } from './QuizCategory';

export type PublicQuiz = {
    id: string;
    question: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    Category_Quiz: QuizCategoryArray;
    Option: PublicQuizOption;
    author: QuizAuthor;
};
