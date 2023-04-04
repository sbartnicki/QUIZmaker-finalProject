import './styles.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../shared/constants';
import { useNavigate } from "react-router-dom";

export default function QuizzesList( { setQuiz } ) {
    const navigate = useNavigate();

    const [quizTitles, setQuizTitles] = useState( [] );

    useEffect( () => {
        axios
            .get( `${ apiURL }quizzes`, {
                headers: {
                    'x-auth-token': localStorage.getItem( 'token' ),
                },
            } )
            .then( ( res ) => {
                setQuizTitles( res.data || [] );
            } )
            .catch( ( err ) => {
                console.log( 'error: ', err );
            } );
    }, [] );

    const editQuiz = ( id ) => {
        navigate( `edit/${ id }` );
    };

    const cloneQuiz = ( id ) => {
        navigate( `clone/${ id }` );
    };

    return (
        <div className="quizzes-list-comp">
            <h3>My quizzes:</h3>
            <ul>
                { quizTitles.map( ( item, index ) => (
                    <li
                        key={ index }
                    >
                        <span>{ item.title }</span>
                        <div className="actions">
                            <button onClick={ () => editQuiz( item._id ) }>Edit</button>
                            <button onClick={ () => cloneQuiz( item._id ) }>Clone</button>
                        </div>
                    </li>
                ) ) }
            </ul>
        </div>
    );
}
