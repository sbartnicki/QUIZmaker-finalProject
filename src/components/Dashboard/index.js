import Header from "./../Header";
import QuizzesList from "./QuizzesList";

import './styles.scss';

export default function Dashboard() {
  const handleCreateQuiz = () => {};

  return (
    <div className="dashboard-comp">
      <Header />
      <div className="dashboard-no-header">
        <QuizzesList />

        <div className="dashboard-main">
          <button onClick={handleCreateQuiz} className="create-button" title="Create Button">Create a new quiz</button>
          <p className="dashboard-text">
            ... or select existing quiz from the list on the left in order to
            edit it
          </p>
        </div>
      </div>
    </div>
  );
}
