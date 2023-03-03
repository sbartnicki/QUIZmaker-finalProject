import { useEffect, useState } from "react";
import NewQuestion from "./NewQuestion";

const NewQuiz = () => {

    const [quiz, setQuiz] = useState(
        {
            ownerId: null,
            created: null,
            title: '',
            questions: []
        }
    )

    useEffect( () => {
        const newQuestion = [createQuestion()];

        setQuiz( currentQuiz => {
            return {
                ...currentQuiz,
                questions: newQuestion
            }
        } );
    }, [] );

    function createQuestion() {
        return {
            id: quiz.questions.length,
            type: 'tf',
            question: '',
            answers: Array( 2 ).fill( '' ),
            correctAns: []
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
        updatedQuestions[question.id] = question;

        setQuiz( currentQuiz => {

            console.log( 'question: ', question );
            return {
                ...currentQuiz,
                questions: updatedQuestions
            }
        } )
    }

    const handleFormSubmit = ( e ) => {
        e.preventDefault();

        if (validateAnswers()) {
            console.warn( 'All of the answers should be fulfilled' );
            return;
        }

        if (validateCorrectAnswers()) {
            console.warn( 'Each question should contain at least one correct answer' );
            return;
        }

        console.log( 'Current quiz obj: ', quiz );
    }

    const validateCorrectAnswers = () => {
        return quiz.questions.find( question => !question.correctAns.length );
    }

    const validateAnswers = () => {
        return quiz.questions.find( question => question.answers.some( answer => !answer.length ) );
    }

    return (
        <div>
            <h2>New Quiz</h2>
            <form onSubmit={ handleFormSubmit }>
                <label>
                    Title:
                    <input
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
                            onQuestionEdit={ handleQuestionEdit }
                        />
                    )
                }

                <button type="button" onClick={ handleAddQuestion }>Add new question</button>

                <button type="submit">Save Quiz</button>

            </form>

        </div>
    )
};

export default NewQuiz;