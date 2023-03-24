import Header from './../Header';
import QuizList from './QuizList';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

import './styles.scss';

export default function Dashboard() {

  return (
    <div className="dashboard-comp">
      <Header />
      <div className="quiz-list-and-main">
        <QuizList />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
