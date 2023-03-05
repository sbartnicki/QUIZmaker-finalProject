import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {

    const navigate = useNavigate();

    const handleCreateQuiz = () => {
        navigate( 'new' );
    };

    return (
        <div className="quiz-creation">
            <button
                onClick={ handleCreateQuiz }
                className="create-button"
                title="Create Button"
            >
                Create a new quiz
            </button>
            <p className="dashboard-text">
                ... or select existing quiz from the list on the left in order to edit
                it
            </p>
        </div>
    );
}
