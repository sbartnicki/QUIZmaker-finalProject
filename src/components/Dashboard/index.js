import Header from './../Header';
import QuizList from './QuizList';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import './styles.scss';

export default function Dashboard() {
  // const location = useLocation();
  // let quizTitles = [];

  // if (location.state) {
  //     console.log('location.state: ', location.state);
  //   quizTitles = location.state.map((item) => item.title);
  // }

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
