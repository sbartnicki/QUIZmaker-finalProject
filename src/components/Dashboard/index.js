import Header from "./../Header";
import QuizList from "./QuizList";
import Footer from "../Footer";

import "./styles.scss";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="dashboard-comp">
            <Header/>
            <div className="quiz-list-and-main">
                <QuizList/>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}