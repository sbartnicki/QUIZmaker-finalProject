import './styles.scss';

export default function QuizzesList() {
  return (
    <div className="quizzes-list-comp">
      <h3>My quizzes:</h3>
      <ul>
        <li><a href="#">Week 2 Quiz</a></li>
        <li><a href="#">MidTerm</a></li>
        <li><a href="#">Final Exam</a></li>
      </ul>
    </div>
  );
}
