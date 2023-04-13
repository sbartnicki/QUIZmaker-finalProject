import { Routes, Route } from 'react-router-dom';
import { InitialScreen } from './components/InitialScreen';
import { VerifyPage } from './components/VerifyPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { PageNotFound } from './components/PageNotFound';
import AnswerQuiz from './components/AnswerQuiz';
import NewQuiz from './components/Dashboard/NewQuiz';
import Dashboard from './components/Dashboard';
import CreateQuiz from './components/Dashboard/CreateQuiz';
import ProtectedRoute from './util/ProtectedRoute';


export function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          } />
          <Route path="new" element={
            <ProtectedRoute>
              <NewQuiz />
            </ProtectedRoute>
          } />
          <Route path="edit/:id" element={
            <ProtectedRoute>
              <NewQuiz editMode={true} />
            </ProtectedRoute>
          } />
          <Route path="clone/:id" element={
            <ProtectedRoute>
              <NewQuiz cloneMode={true} />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <AnswerQuiz />
          </ProtectedRoute>
        } />
        <Route path="/verify/:token/:userId" element={<VerifyPage />} />
        <Route path="/reset/:token/:userId" element={<ResetPasswordPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
