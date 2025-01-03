export type QuizCategoryArray = QuizCategory;

type QuizCategory = ({
    category: {
        id: string;
        authorId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    };
} & { quizId: string; categoryId: string })[];
