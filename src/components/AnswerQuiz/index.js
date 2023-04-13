import axios from "axios";
import { apiURL } from "../../shared/constants";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Question from "./Question/Question.js";
import "./styles.scss";
import QuizzesList from "../Dashboard/QuizList";
import Header from "../Header";
import Footer from "../Footer";

const Questions = ({ questions, onChange }) => {
  return (
    <div>
      {questions.map((question) => {
        return (
          <Question
            key={question.question}
            question={question}
            index={questions.indexOf(question)}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let validate = [];

  useEffect(() => {
    (async () => {
      await axios
        .get(`${apiURL}quizzes/`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const quizToAnswer = res.data.find((quiz) => quiz._id === params.id);
          setQuiz(quizToAnswer);
        })
        .catch((error) => {
          console.warn(error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    setShowSuccess(false);
    console.log(quiz);

    quiz.questions.forEach((question) => {
      if (!question.answers) {
        validate.push("All the questions are required to submit the quiz.");
        setErrorMessage(validate);
      }
    });

    if (!errorMessage) {
      const answersQuiz = {
        quizId: params.id,
        userId: localStorage.getItem("userId"),
        questions: quizWithScore.questions,
        score: quizWithScore.score,
      };

      axios
        .post(`${apiURL}answers`, answersQuiz)
        .then((res) => {
          console.log("res: ", res);
          setShowSuccess(true);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };

  const handleOnChange = (newQuestion) => {
    setErrorMessage(false);

    // get ONLY the questions from the quiz
    let oldQuestions = [...quiz.questions];

    // find the question that is equal to the one modified
    const questionToUpdate = oldQuestions.find(
      (it) => it.question === newQuestion.question
    );

    // modify the array with ALL questions updating the question modified
    const newQuestions = oldQuestions.map((oldQuestion) => {
      if (oldQuestion.question === questionToUpdate.question) {
        return newQuestion;
      }
      return oldQuestion;
    });

    // get the WHOLE old quiz
    const newQuiz = { ...quiz };

    // update the old quiz with the question answered
    newQuiz.questions = [...newQuestions];
    setQuiz(newQuiz);
  };

  if (!quiz) {
    return (
      <div className="dashboard-comp">
        <Header />
        <div className="quiz-list-and-main">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const addScore = (quizMissingScore) => {
    let score = 0;

    quizMissingScore.questions.forEach((question) => {
      const answers = question.answers || [];

      // get the options, filter the one that isCorrect is true
      // and return an array with the related text of it
      const correctAnswers = question.options
        .filter((it) => it.isCorrect)
        .map((it) => it.text);

      // get the options, filter the one that isCorrect is false
      // and return an array with the related text of it
      const incorrectAnswers = question.options
        .filter((it) => !it.isCorrect)
        .map((it) => it.text);

      let alreadyChecked = false;

      answers.forEach((answer) => {
        // verify for each answer:
        // 1. if the answers are correct
        // 2. if the answers does not contain any incorrect answer
        // 3. if the amount of answers correct is right
        // 4. if it is not checked (to not score questions with more than one correct answer more than one time)
        if (
          correctAnswers.includes(answer) &&
          !incorrectAnswers.includes(answer) &&
          answers.length === correctAnswers.length &&
          !alreadyChecked
        ) {
          score = score + 1;
        }
        alreadyChecked = true;
      });
    });

    // add scores in the quiz
    const quizWithScore = { ...quizMissingScore, score };
    return quizWithScore;
  };

  const quizWithScore = addScore(quiz);

  let questionsToRender = [...quizWithScore.questions];

  const handleReturnDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="dashboard-comp">
      <Header />
      <div>
        <div className="quiz-wrapper">
          {!showSuccess && (
            <form onSubmit={handleQuizSubmit}>
              <h2 className="quiz-title">{quiz.title}</h2>
              <Questions
                questions={questionsToRender}
                onChange={handleOnChange}
              />
              <div className="quiz-footer">
                {errorMessage && (
                  <div className="warning-error">{errorMessage}</div>
                )}
                <button className="_green">Submit Quiz</button>
              </div>
            </form>
          )}

          {showSuccess && (
            <div className="success-message">
              <div className="score-quiz">
                <h3>Score:</h3>
                {quizWithScore.score} / {quizWithScore.questions.length}
              </div>
              <p>You successfully submitted your quiz answers!</p>
              <button className="_blue" onClick={handleReturnDashboard}>
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
