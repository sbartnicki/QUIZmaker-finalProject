import { SignIn } from "./SignIn";
import "./styles.css";

export function InitialScreen() {
  return(
    <div className="wrapper">
      <div>
        <h1 className="initialPageTitle">QUIZ Maker</h1>
        <h3 className="initialPageDescription">Let's make some quizzes!</h3>
      </div>
      <div className="verticalLine"></div>
      <div>
        <SignIn/>
      </div>
    </div>
  );
}