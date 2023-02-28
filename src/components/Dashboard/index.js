import Header from "./../Header";
import QuizList from "./QuizList";
import CreateQuiz from "./CreateQuiz";
import Footer from "../Footer";

import "./styles.scss";

export default function Dashboard() {
  return (
    <div className="dashboard-comp">
      <Header />
      <div className="quiz-list-and-main">
        <QuizList />
        <CreateQuiz />
      </div>
      <Footer />
    </div>
  );
}
