import './styles.scss';

export default function QuizzesList({ quizTitles }) {
  return (
    <div className="quizzes-list-comp">
      <h3>My quizzes:</h3>
      <ul>
        {quizTitles.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
