import { SignIn } from "./SignIn";
import "./styles.scss";

export function InitialScreen() {
  return(
    <div className="wrapper">
      <div>
        <h1>QUIZ Maker</h1>
        <h3>Let's make some quizzes!</h3>
      </div>
      <div className="verticalLine"></div>
      <div>
        <SignIn/>
      </div>
    </div>
  );
}