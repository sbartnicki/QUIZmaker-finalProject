import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import "./styles.scss";
import NewQuestion from "./NewQuestion";
import { apiURL } from "../../../shared/constants";

const NEW_QUIZ = {
  ownerId: localStorage.getItem("userId"),
  created: null,
  title: "",
  draft: false,
  questions: [
    {
      _id: uuidv4(),
      type: "tf",
      question: "",
      options: [
        {
          _id: uuidv4(),
          text: "",
          isCorrect: false,
        },
        {
          _id: uuidv4(),
          text: "",
          isCorrect: false,
        },
      ],
    },
  ],
};

const NewQuiz = ({ editMode, cloneMode }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [trigger, setTrigger] = useOutletContext();

  const [savedQuiz, setSavedQuiz] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [isNewQuiz, setIsNewQuiz] = useState(false);

  const [draft, setDraft] = useState(false);
  useEffect(() => {
    setQuiz(null);
    setIsNewQuiz(false);

    if (params.id) {
      axios
        .get(`${apiURL}quizzes/${params.id}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data) {
            const QUIZ = res.data;

            if (cloneMode) {
              delete QUIZ._id;
              delete QUIZ.__v;
            }

            QUIZ.questions.forEach((question) => {
              question._id = uuidv4();

              question.options.forEach((option) => {
                option._id = uuidv4();
              });
            });

            setQuiz(QUIZ);
          }
        });
    } else {
      setIsNewQuiz(true);
      setQuiz(NEW_QUIZ);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function createQuestion() {
    return {
      _id: uuidv4(),
      type: "tf",
      question: "",
      options: [
        {
          _id: uuidv4(),
          text: "",
          isCorrect: false,
        },
        {
          _id: uuidv4(),
          text: "",
          isCorrect: false,
        },
      ],
    };
  }

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setQuiz((currentQuiz) => {
      return {
        ...currentQuiz,
        title,
      };
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = createQuestion();

    setQuiz((currentQuiz) => {
      return {
        ...currentQuiz,
        questions: [...currentQuiz.questions, newQuestion],
      };
    });
  };

  const handleQuestionEdit = (question) => {
    const updatedQuestions = [...quiz.questions];
    const questionIndexToReplace = updatedQuestions.findIndex(
      (item) => item._id === question._id
    );
    updatedQuestions[questionIndexToReplace] = question;

    setQuiz((currentQuiz) => {
      return {
        ...currentQuiz,
        questions: updatedQuestions,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateTitle()) {
      console.warn("Quiz is supposed to have a title");
      return;
    }

    if (validateAnswers()) {
      console.warn("All of the answers should be fulfilled");
      return;
    }

    if (!validateCorrectAnswers()) {
      console.warn("Each question should contain at least one correct answer");
      return;
    }

    const newQuiz = normalizeQuiz(quiz);

    if (isNewQuiz || cloneMode) {
      axios
        .post(`${apiURL}quizzes/`, newQuiz)
        .then((res) => {
          setLinkId(res.data._id);
          setSavedQuiz(true);
          quiz.questions.forEach((question) => {
            question.options.forEach((option) => option.text = "");
            question.options.forEach((option) => option._id = uuidv4());
          });
        })
        .catch((error) => {
          console.warn(error);
        });
    } else {
      axios
        .put(`${apiURL}quizzes/${quiz._id}`, newQuiz)
        .then((res) => {
          console.log("res: ", res);
          setLinkId(res.data._id);
          setSavedQuiz(true);
          setTrigger(res.data);
          quiz.questions.forEach((question) => {
            question.options.forEach((option) => option.text = "");
            question.options.forEach((option) => option._id = uuidv4());
          });
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  };

  const normalizeQuiz = (quiz) => {
    quiz.created = Date.now();
    quiz.questions.forEach((question) => {
      delete question._id;

      question.options.forEach((option) => {
        delete option._id;
      });
    });
    quiz.draft = draft;

    return quiz;
  };

  const validateTitle = () => {
    return !quiz.title.length;
  };

  const validateCorrectAnswers = () => {
    let isValid = true;

    quiz.questions.forEach((question) => {
      const correctAnswerIsPresent = question.options.find(
        (option) => option.isCorrect
      );

      if (!correctAnswerIsPresent) {
        isValid = false;
        return;
      }
    });
    return isValid;
  };

  const validateAnswers = () => {
    return quiz.questions.find( question => question.options.some( option => !option.text.length ) );
  };

  const handleReturnDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleRedirectQuiz = (e) => {
    e.preventDefault();
    navigate(`/quiz/${linkId}`);
  };

  // New function 
  const handleCloneQuestion = (event, index) => {
    const newQuestion = quiz.questions[index].question;
    const newType = quiz.questions[index].type;
    let isCorrectAux = false;

    let newOptions = [];
    quiz.questions[index].options.forEach((option) => {

      if (option.isCorrect) {
        isCorrectAux = true
      } 
      else {
        isCorrectAux = false
      }

      newOptions.push(
        {
          _id: uuidv4(),
          text: option.text,
          isCorrect: isCorrectAux
        },
      );
    });


    setQuiz((currentQuiz) => {
      return {
        ...currentQuiz,
        questions: [...currentQuiz.questions,
        {
          _id: uuidv4(),
          type: newType,
          question: newQuestion,
          options: newOptions
        }],
      };
    });
  };

  return (
    <div className="new-quiz">
      {quiz && (
        <>
          <h2 className="new-quiz__title">
            {isNewQuiz
              ? "New Quiz"
              : cloneMode
              ? `DUPLICATING: ${quiz.title}`
              : editMode
              ? `EDITING: ${quiz.title}`
              : quiz.title}
          </h2>
          <form className="new-quiz__form" onSubmit={handleFormSubmit}>
            {!savedQuiz && quiz && (
              <>
                <label className="new-quiz__label">
                  Title:
                  <input
                    className="new-quiz__input"
                    name="title"
                    type="text"
                    value={quiz.title}
                    onChange={handleTitleChange}
                  />
                </label>

                {quiz.questions.map((question, index) => (
                  <NewQuestion
                    key={index}
                    question={question}
                    index={index}
                    onQuestionEdit={handleQuestionEdit}
                    onCloneQuestion={handleCloneQuestion}
                  />
                ))}

                <div className="new-quiz__actions">
                  <button
                    type="button"
                    className="new-quiz__button _blue"
                    onClick={handleAddQuestion}
                  >
                    Add new question
                  </button>

                  <button
                    className="new-quiz__button _green _centered"
                    type="submit"
                  >
                    Save Quiz
                  </button>
                  <label>
                    Draft
                    <input
                      type="checkbox"
                      checked={draft}
                      onChange={(e) => setDraft(e.target.checked)}
                    />
                  </label>
                </div>
              </>
            )}

            {savedQuiz && quiz && (
              <div className="saved-quiz">
                Your quiz was successfully saved!
                <p className="link-quiz" onClick={handleRedirectQuiz}>
                  Link:
                  <span className="quiz-url">
                    {" "}
                    https://quiz-maker-two.vercel.app/quiz/{linkId}
                  </span>{" "}
                </p>
                <div className="buttons-saved-quiz">
                  <button className=" _blue" onClick={handleRedirectQuiz}>
                    Go to Quiz
                  </button>
                  <button className=" _blue" onClick={handleReturnDashboard}>
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </form>
        </>
      )}
      {!quiz && <h2>The Quiz is being Loading</h2>}
    </div>
  );
};

export default NewQuiz;
