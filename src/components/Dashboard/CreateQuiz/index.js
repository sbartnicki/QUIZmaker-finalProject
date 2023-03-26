import './styles.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CreateQuiz() {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('new');
  };
  // Added this to make quiz displaying work, temporary solution, SLY
  // 12 lines
  const outletContext = useOutletContext();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(outletContext);
  }, [outletContext]);

  useEffect(() => {
    if (context) {
      navigate('new');
    }
  }, [context, navigate]);

  return (
    <div className="quiz-creation">
      <button
        onClick={handleCreateQuiz}
        className="create-button"
        title="Create Button"
      >
        Create a new quiz
      </button>
      <p className="dashboard-text">
        ... or select existing quiz from the list on the left in order to edit
        it
      </p>
    </div>
  );
}
