import Header from './../Header';
import QuizList from './QuizList';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

import './styles.scss';
import { useState } from 'react';

export default function Dashboard() {
  const [quiz, setQuiz] = useState(null);

  return (
    <div className="dashboard-comp">
      <Header />
      <div className="quiz-list-and-main">
        <QuizList setQuiz={setQuiz} />
        <Outlet context={quiz} />
      </div>
      <Footer />
    </div>
  );
}
