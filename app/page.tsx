import CategoryPost from '@/features/categoryPost/CategoryPost';
import QuizViews from './../features/quizViews/QuizViews';

export default function Home() {
    return (
        <main className="">
            <h1>Fruitsbase</h1>
            <CategoryPost />
            <QuizViews />
        </main>
    );
}
