import { useEffect, useState } from "react";

const NewQuestion = ( { onQuestionEdit, question } ) => {

    const [newQuestion, setNewQuestion] = useState( question );

    useEffect( () => {
        onQuestionEdit( newQuestion );
    }, [newQuestion] );

    const handleTypeChange = ( event ) => {
        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                answers: oldQuestion.type === 'tf' ? oldQuestion.answers.slice(0, 2) : oldQuestion.answers,
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

    const handleDeleteOption = (event) => {
        const answers = [...question.answers];

        answers.splice(event.target.getAttribute('index'), 1);

        setNewQuestion(oldQuestion => {
            return {
                ...oldQuestion,
                answers: answers
            }
        })
    }

    const handleAnswerChange = ( event ) => {
        const UPD_QUESTION = newQuestion;

        UPD_QUESTION.answers[event.target.getAttribute( 'index' )] = event.target.value;

        setNewQuestion( UPD_QUESTION )
    }

    const handleCorrectAnswerUpdate = (event) => {
        let correctAns = question.correctAns;

        if (question.type === 'tf') {
            correctAns = [event.target.getAttribute('index')];
        } else {
            if (event.target.checked) {
                correctAns.push(event.target.getAttribute('index'));
            } else {
                const VALUE_TO_DELETE = event.target.getAttribute('index');

                correctAns.splice(correctAns.findIndex(item => item === VALUE_TO_DELETE), 1);
            }
        }

        setNewQuestion( oldQuestion => {
            return {
                ...oldQuestion,
                correctAns
            }
        })

    }


    return (
        <div>
            <h2>Question #{ question.id }</h2>
            <label>
                Question text:
                <input name="text" type="text" onChange={ handleQuestionChange } value={ question.title }/>
            </label>
            <label>
                Question type:
                <select name="type" onChange={ handleTypeChange }>
                    <option value="tf">True/False</option>
                    <option value="mc">Multiple Choice</option>
                </select>
            </label>
            <ul>
                {
                    newQuestion.answers.map( ( option, index ) => {
                        return <li key={ index }>
                            <input type="text"
                                   index={ index }
                                   onChange={ handleAnswerChange }/>
                            <input type={ question.type === 'tf' ? 'radio' : 'checkbox' } index={ index } name={ 'question-' + question.id } onChange={ handleCorrectAnswerUpdate } />
                            <button type="button" index={ index } onClick={ handleDeleteOption }>Delete</button>
                        </li>
                    } )
                }
            </ul>
            {
                question.type === 'mc' && <button type="button" onClick={ handleAddOption }>Add new option</button>
            }
        </div>
    )
};

export default NewQuestion;