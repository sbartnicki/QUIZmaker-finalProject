import './styles.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCopy, AiTwotoneDelete } from 'react-icons/ai';

export default function QuizzesList({ trigger }) {
  const navigate = useNavigate();

  const [quizTitles, setQuizTitles] = useState([]);

  const loadQuizzes = () => {
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
  };

  useEffect(() => {
    loadQuizzes();
  }, [trigger, navigate]);

  const editQuiz = (id) => {
    navigate(`edit/${id}`);
  };

  const cloneQuiz = (id) => {
    navigate(`clone/${id}`);
  };

  const deleteQuiz = (id) => {
    axios.delete(apiURL + 'quizzes/' + id).then((res) => {
      console.log('Deleted: ', res.data);
      loadQuizzes();
    });
  };

  const handleEditClick = (item, e) => {
    if (e.target === e.currentTarget) {
      editQuiz(item._id);
    }
  };

  return (
    <div className="quizzes-list-comp">
      <h3>My quizzes:</h3>
      <ul>
        {quizTitles.map((item, index) => (
          <li key={index} onClick={(e) => handleEditClick(item, e)}>
            <span>{item.title}</span>
            <div className="actions">
              {item.draft && <span className="draft-label">draft</span>}
              <AiTwotoneDelete
                className="delete"
                onClick={() => deleteQuiz(item._id)}
              />
              <AiOutlineCopy onClick={() => cloneQuiz(item._id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
