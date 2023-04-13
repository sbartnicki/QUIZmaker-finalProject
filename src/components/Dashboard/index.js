import Header from './../Header';
import QuizList from './QuizList';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

import './styles.scss';
import { useState } from 'react';

export default function Dashboard() {
  const [trigger, setTrigger] = useState(1); //Updating of this reloads the quizlist

  return (
    <div className="dashboard-comp">
      <Header />
      <div className="quiz-list-and-main">
        <QuizList trigger={trigger} />
        <Outlet context={[trigger, setTrigger]} />
      </div>
      <Footer />
    </div>
  );
}
