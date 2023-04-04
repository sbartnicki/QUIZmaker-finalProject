import './styles.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../shared/constants';
import { Link, NavLink } from "react-router-dom";

export default function QuizzesList( { setQuiz } ) {
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

    return (
        <div className="quizzes-list-comp">
            <h3>My quizzes:</h3>
            <ul>
                { quizTitles.map( ( item, index ) => (
                    <li
                        key={ item._id }
                    >
                        <Link
                            to={ `edit/${ item._id }` }
                            onClick={ () => setQuiz( item ) }
                        >
                            { item.title }
                        </Link>
                    </li>
                ) ) }
            </ul>
        </div>
    );
}
