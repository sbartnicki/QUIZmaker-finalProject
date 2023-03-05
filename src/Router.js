import { Routes, Route } from 'react-router-dom'
import { InitialScreen } from './components/InitialScreen'
import Dashboard from './components/Dashboard'
import CreateQuiz from "./components/Dashboard/CreateQuiz";
import NewQuiz from "./components/Dashboard/NewQuiz";

export function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <InitialScreen/> }/>
                <Route path="/dashboard" element={ <Dashboard/> }>
                    <Route index element={ <CreateQuiz/> }/>
                    <Route path="new" element={ <NewQuiz/> }/>
                </Route>
            </Routes>
        </>
    )
}