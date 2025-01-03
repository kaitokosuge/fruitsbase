import { QuizAuthor } from './QuizAuthor';
import { QuizCategoryArray } from './QuizCategory';
import { QuizOption } from './QuizOption';

export type Quiz = {
    id: string;
    question: string;
    explanation: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    Category_Quiz: QuizCategoryArray;
    Option: QuizOption;
    author: QuizAuthor;
};
