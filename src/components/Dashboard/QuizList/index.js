import './styles.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../shared/constants';

export default function QuizzesList({ setQuiz }) {
  const [quizTitles, setQuizTitles] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiURL}quizzes`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setQuizTitles(res.data || []);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);

  return (
    <div className="quizzes-list-comp">
      <h3>My quizzes:</h3>
      <ul>
        {quizTitles.map((item, index) => (
          <li onClick={() => setQuiz(item)} key={index}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
