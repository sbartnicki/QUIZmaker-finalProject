import { useEffect, useState } from "react";
import './styles.scss';

const NewQuestion = ( { onQuestionEdit, question } ) => {

    const [newQuestion, setNewQuestion] = useState( question );

    useEffect( () => {
        onQuestionEdit( newQuestion );
    }, [newQuestion, onQuestionEdit] );

    const handleTypeChange = ( event ) => {
        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                answers: event.target.value === 'tf' ? oldQuestion.answers.slice( 0, 2 ) : oldQuestion.answers,
                correctAns: [],
                type: event.target.value
            }
        } );
    }

    const handleQuestionChange = ( event ) => {
        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                question: event.target.value
            }
        } );
    };

    const handleAddOption = () => {
        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                answers: [
                    ...oldQuestion.answers,
                    ''
                ]
            }
        } )
    }

    const handleDeleteOption = ( event ) => {
        const answers = [...question.answers];

        answers.splice( event.target.getAttribute( 'index' ), 1 );

        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                answers: answers
            }
        } )
    }

    const handleAnswerChange = ( event ) => {
        const UPD_QUESTION = newQuestion;

        UPD_QUESTION.answers[event.target.getAttribute( 'index' )] = event.target.value;

        setNewQuestion( UPD_QUESTION )
    }

    const handleCorrectAnswerUpdate = ( event ) => {
        let correctAns = question.correctAns;

        if (question.type === 'tf') {
            correctAns = [event.target.getAttribute( 'index' )];
        } else {
            if (event.target.checked) {
                correctAns.push( event.target.getAttribute( 'index' ) );
            } else {
                const VALUE_TO_DELETE = event.target.getAttribute( 'index' );

                correctAns.splice( correctAns.findIndex( item => item === VALUE_TO_DELETE ), 1 );
            }
        }

        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                correctAns
            }
        } )

    }


    return (
        <div className="new-question">
            <div className="new-question__top">
                <h3 className="new-question__title">Question #{ question.id }</h3>
                <label className="new-question__label">
                    Question type:
                    <select className="new-question__select" name="type" onChange={ handleTypeChange }>
                        <option className="new-question__option" value="tf">True/False</option>
                        <option className="new-question__option" value="mc">Multiple Choice</option>
                    </select>
                </label>
            </div>
            <label className="new-question__label">
                Question text:
                <input className="new-question__input" name="text" type="text" onChange={ handleQuestionChange } value={ question.title }/>
            </label>
            <p>Answers: </p>
            <ol className="new-question__list">
                {
                    newQuestion.answers.map( ( option, index ) => {
                        return <li className="new-question__item" key={ index }>
                            <input className="new-question__input answer" type="text"
                                   index={ index }
                                   onChange={ handleAnswerChange }/>
                            {
                                question.type === 'tf' &&
                                <input className="new-question__input" type="radio" index={ index } name={ 'question-' + question.id }
                                       onChange={ handleCorrectAnswerUpdate }/>
                            }
                            {
                                question.type === 'mc' &&
                                <input className="new-question__input" type="checkbox" index={ index } name={ 'question-' + question.id }
                                       onChange={ handleCorrectAnswerUpdate }/>
                            }
                            <button className="new-question__button _red _ml-auto" type="button" index={ index } onClick={ handleDeleteOption }>Delete</button>
                        </li>
                    } )
                }
            </ol>
            {
                question.type === 'mc' && <button className="new-question__button _blue _small" type="button" onClick={ handleAddOption }>Add new option</button>
            }
        </div>
    )
};

export default NewQuestion;