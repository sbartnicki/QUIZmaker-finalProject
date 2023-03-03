import { Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import Dashboard from "./components/Dashboard";
import CreateQuiz from "./components/Dashboard/CreateQuiz";
import NewQuiz from "./components/Dashboard/NewQuiz";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <WelcomeScreen/> }/>
                <Route path="/dashboard" element={ <Dashboard/> }>
                    <Route index element={ <CreateQuiz/> }/>
                    <Route path="new" element={ <NewQuiz/> }/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
