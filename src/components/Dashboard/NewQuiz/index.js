import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import './styles.scss';
import NewQuestion from "./NewQuestion";
import { apiURL } from "../../../shared/constants";

const NewQuiz = () => {

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(
        {
            ownerId: localStorage.getItem( 'userId' ),
            created: null,
            title: '',
            questions: [
                {
                    id: uuidv4(),
                    type: 'tf',
                    question: '',
                    options: [
                        {
                            id: uuidv4(),
                            text: '',
                            isCorrect: false
                        },
                        {
                            id: uuidv4(),
                            text: '',
                            isCorrect: false
                        }
                    ]
                }
            ]
        }
    )

    function createQuestion() {
        return {
            id: uuidv4(),
            type: 'tf',
            question: '',
            options: [
                {
                    id: uuidv4(),
                    text: '',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    text: '',
                    isCorrect: false
                }
            ]
        }
    }

    const handleTitleChange = ( event ) => {
        const title = event.target.value;

        setQuiz( currentQuiz => {
            return {
                ...currentQuiz,
                title
            }
        } );
    }

    const handleAddQuestion = () => {
        const newQuestion = createQuestion();

        setQuiz( currentQuiz => {
            return {
                ...currentQuiz,
                questions: [...currentQuiz.questions, newQuestion]
            }
        } );
    }

    const handleQuestionEdit = ( question ) => {
        const updatedQuestions = [...quiz.questions];
        const questionIndexToReplace = updatedQuestions.findIndex( item => item.id === question.id );
        updatedQuestions[questionIndexToReplace] = question;

        setQuiz( currentQuiz => {

            return {
                ...currentQuiz,
                questions: updatedQuestions
            }
        } )
    }

    const handleFormSubmit = ( e ) => {
        e.preventDefault();

        if (validateTitle()) {
            console.warn( 'Quiz is supposed to have a title' );
            return;
        }

        if (validateAnswers()) {
            console.warn( 'All of the answers should be fulfilled' );
            return;
        }

        if (!validateCorrectAnswers()) {
            console.warn( 'Each question should contain at least one correct answer' );
            return;
        }

        const newQuiz = normalizeQuiz(quiz);


        axios.post( `${ apiURL }quizzes/`, newQuiz )
            .then( res => {
                console.log( 'res: ', res );
                //TODO: Should be finished logic for dashboard rendering
                navigate('/dashboard', { state: res.data });
            } )
            .catch( error => {
                console.warn( error );
            } )
    }

    const normalizeQuiz = (quiz) => {
        quiz.created = Date.now();
        quiz.questions.map( question => {
            delete question.id

            question.options.map( option => {
                delete option.id
            } )
        } );

        return quiz;
    }

    const validateTitle = () => {
        return !quiz.title.length;
    }

    const validateCorrectAnswers = () => {
        let isValid = true;

        quiz.questions.forEach( question => {
            const correctAnswerIsPresent = question.options.find( option => option.isCorrect );

            if (!correctAnswerIsPresent) {
                console.log( 'question: ', question );
                isValid = false;
                return;
            }
        } );
        return isValid;
    }

    const validateAnswers = () => {
        return quiz.questions.find( question => !question.options.length );
    }

    return (
        <div className="new-quiz">
            <h2 className="new-quiz__title">New Quiz</h2>
            <form className="new-quiz__form" onSubmit={ handleFormSubmit }>
                <label className="new-quiz__label">
                    Title:
                    <input
                        className="new-quiz__input"
                        name="title"
                        type="text"
                        value={ quiz.title }
                        onChange={ handleTitleChange }
                    />
                </label>

                {
                    quiz.questions.map( ( question, index ) =>
                        <NewQuestion
                            key={ index }
                            question={ question }
                            index={ index }
                            onQuestionEdit={ handleQuestionEdit }
                        />
                    )
                }

                <div className="new-quiz__actions">
                    <button
                        type="button"
                        className="new-quiz__button _blue"
                        onClick={ handleAddQuestion }>
                        Add new question
                    </button>

                    <button
                        className="new-quiz__button _green _centered"
                        type="submit">
                        Save Quiz
                    </button>
                </div>

            </form>

        </div>
    )
};

export default NewQuiz;