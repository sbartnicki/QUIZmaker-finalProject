import "./styles.scss";

export default function CreateQuiz() {
  const handleCreateQuiz = () => {};

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
