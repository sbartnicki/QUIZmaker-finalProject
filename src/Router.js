import { Routes, Route } from 'react-router-dom';
import { InitialScreen } from './components/InitialScreen';
import { VerifyPage } from "./components/VerifyPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { PageNotFound } from "./components/PageNotFound";
import AnswerQuiz from "./components/AnswerQuiz";
import Dashboard from './components/Dashboard';
import CreateQuiz from "./components/Dashboard/CreateQuiz";
import NewQuiz from "./components/Dashboard/NewQuiz";

export function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<CreateQuiz />} />
                    <Route path="new" element={<NewQuiz />} />
                    <Route path="edit/:id" element={<NewQuiz editMode={ true } />} />
                    <Route path="clone/:id" element={<NewQuiz cloneMode={ true } />} />
                </Route>
                <Route path="/quiz/:id" element={<AnswerQuiz />} />
                <Route path="/verify/:token/:userId" element={<VerifyPage />} />
                <Route path="/reset/:token/:userId" element={<ResetPasswordPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}