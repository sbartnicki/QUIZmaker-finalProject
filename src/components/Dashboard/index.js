import Header from './../Header';
import QuizList from './QuizList';
import CreateQuiz from './CreateQuiz';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import './styles.scss';

export default function Dashboard() {
  const location = useLocation();
  const quizTitles = location.state.map((item) => item.title);

  return (
    <div className="dashboard-comp">
      <Header />
      <div className="quiz-list-and-main">
        <QuizList quizTitles={quizTitles} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
