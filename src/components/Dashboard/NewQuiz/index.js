import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './styles.scss';
import NewQuestion from './NewQuestion';
import { apiURL } from '../../../shared/constants';

const NEW_QUIZ = {
    ownerId: localStorage.getItem( 'userId' ),
    created: null,
    title: '',
    questions: [
        {
            _id: uuidv4(),
            type: 'tf',
            question: '',
            options: [
                {
                    _id: uuidv4(),
                    text: '',
                    isCorrect: false,
                },
                {
                    _id: uuidv4(),
                    text: '',
                    isCorrect: false,
                },
            ],
        },
    ],
};

const NewQuiz = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [savedQuiz, setSavedQuiz] = useState( false );
    const [linkId, setLinkId] = useState( '' );
    const [quiz, setQuiz] = useState( null );
    const [isNewQuiz, setIsNewQuiz] = useState( false );

    useEffect( () => {
        setQuiz( null );
        setIsNewQuiz( false );

        if (params.id) {
            axios.get( `${ apiURL }quizzes/${ params.id }`, {
                headers: {
                    'x-auth-token': localStorage.getItem( 'token' )
                }
            } )
                .then( res => {
                    if (res.data) {
                        const QUIZ = res.data;

                        QUIZ.questions.forEach( question => {
                            question._id = uuidv4();

                            question.options.forEach( option => {
                                option._id = uuidv4();
                            } )
                        } );

                        setQuiz( QUIZ );
                    }
                } )
        } else {
            setIsNewQuiz( true );
            setQuiz( NEW_QUIZ );
        }
    }, [params] );

    function createQuestion() {
        return {
            id: uuidv4(),
            type: 'tf',
            question: '',
            options: [
                {
                    id: uuidv4(),
                    text: '',
                    isCorrect: false,
                },
                {
                    id: uuidv4(),
                    text: '',
                    isCorrect: false,
                },
            ],
        };
    }

    const handleTitleChange = ( event ) => {
        const title = event.target.value;

        setQuiz( ( currentQuiz ) => {
            return {
                ...currentQuiz,
                title,
            };
        } );
    };

    const handleAddQuestion = () => {
        const newQuestion = createQuestion();

        setQuiz( ( currentQuiz ) => {
            return {
                ...currentQuiz,
                questions: [...currentQuiz.questions, newQuestion],
            };
        } );
    };

    const handleQuestionEdit = ( question ) => {
        const updatedQuestions = [...quiz.questions];
        const questionIndexToReplace = updatedQuestions.findIndex(
            ( item ) => item._id === question._id
        );
        updatedQuestions[questionIndexToReplace] = question;

        setQuiz( ( currentQuiz ) => {
            return {
                ...currentQuiz,
                questions: updatedQuestions,
            };
        } );
    };

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

        const newQuiz = normalizeQuiz( quiz );

        if (isNewQuiz) {
            axios
                .post( `${ apiURL }quizzes/`, newQuiz )
                .then( ( res ) => {
                    setLinkId( res.data._id );
                    setSavedQuiz( true );
                } )
                .catch( ( error ) => {
                    console.warn( error );
                } );
        } else {
            axios.put( `${ apiURL }quizzes/${ quiz._id }`, newQuiz )
                .then( res => {
                    console.log( 'res: ', res );
                } )
                .catch( err => {
                    console.log( 'err: ', err );
                } )
        }
    };

    const normalizeQuiz = ( quiz ) => {
        quiz.created = Date.now();
        quiz.questions.forEach( ( question ) => {
            delete question._id;

            question.options.forEach( ( option ) => {
                delete option._id;
            } );
        } );

        return quiz;
    };

    const validateTitle = () => {
        return !quiz.title.length;
    };

    const validateCorrectAnswers = () => {
        let isValid = true;

        quiz.questions.forEach( ( question ) => {
            const correctAnswerIsPresent = question.options.find(
                ( option ) => option.isCorrect
            );

            if (!correctAnswerIsPresent) {
                isValid = false;
                return;
            }
        } );
        return isValid;
    };

    const validateAnswers = () => {
        return quiz.questions.find( ( question ) => !question.options.length );
    };

    const handleReturnDashboard = ( e ) => {
        e.preventDefault();
        navigate( '/dashboard' );
    };

    const handleRedirectQuiz = ( e ) => {
        e.preventDefault();
        navigate( `/quiz/${ linkId }` );
    };

    return (
        <div className="new-quiz">
            {
                quiz &&
                <>
                    <h2 className="new-quiz__title">{
                        isNewQuiz ? 'New Quiz' : quiz.title
                    }</h2>
                    <form className="new-quiz__form" onSubmit={ handleFormSubmit }>
                        { !savedQuiz && quiz && (
                            <>
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
                                    quiz.questions.map( ( question, index ) => (
                                            <NewQuestion
                                                key={ question._id }
                                                question={ question }
                                                index={ index }
                                                onQuestionEdit={ handleQuestionEdit }
                                            />
                                        )
                                    ) }

                                <div className="new-quiz__actions">
                                    <button
                                        type="button"
                                        className="new-quiz__button _blue"
                                        onClick={ handleAddQuestion }
                                    >
                                        Add new question
                                    </button>

                                    <button
                                        className="new-quiz__button _green _centered"
                                        type="submit"
                                    >
                                        Save Quiz
                                    </button>
                                </div>
                            </>
                        ) }

                        { savedQuiz && quiz && (
                            <div className="saved-quiz">
                                Your quiz was succesfully saved!
                                <p className="link-quiz">
                                    Link: https://quiz-maker-two.vercel.app/quiz/{ linkId }
                                </p>
                                <div className="buttons-saved-quiz">
                                    <button className=" _blue" onClick={ handleRedirectQuiz }>
                                        Go to Quiz
                                    </button>
                                    <button className=" _blue" onClick={ handleReturnDashboard }>
                                        Return to Dashboard
                                    </button>
                                </div>
                            </div>
                        ) }
                    </form>
                </>
            }
            {
                !quiz &&
                <h2>The Quiz is being Loading</h2>
            }
        </div>
    );
};

export default NewQuiz;
