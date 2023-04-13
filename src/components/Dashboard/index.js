import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from './../Header';
import QuizList from './QuizList';
import Footer from '../Footer';

import './styles.scss';

export default function Dashboard() {
  const [trigger, setTrigger] = useState(1); //Updating of this reloads the quizlist

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <div className="dashboard-comp">
      {isLoggedIn && <Header />}
      <div className="quiz-list-and-main">
        {isLoggedIn && <QuizList trigger={trigger} />}
        <Outlet context={[trigger, setTrigger]} />
      </div>
      {isLoggedIn && <Footer />}
    </div>
  );
}
