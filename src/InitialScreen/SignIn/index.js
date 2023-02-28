import { Input } from "./Input";
import { useState } from "react"
import "./styles.scss";

export function SignIn() {
  const [title, setTitle] = useState("Welcome");
  const [registered, setRegistered] = useState(false);
  const [sentLink, setSentLink] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  // Handle Functions
  const handleClickSignIn = (e) => {
    e.preventDefault();
    setRegistered(false);
    console.log("Signed In");
  }

  const handleClickRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  }

  const handleForgotPassword = () => {
    setForgotPassword(true);
    setTitle("Password Reminder");
  }

  const handleResetLink = () => {
    setSentLink(true);
    console.log("Reset");
  }

  const handleReturnHome = () => {
    console.log("Returned Home");
    setForgotPassword(false);
    setSentLink(false);
    setTitle("Welcome");
  }

  return(
    <div className="signIn-page">
      {/* Sign In and Register */}
      {forgotPassword === false &&
      <>
        <h2>{title}</h2>
        <div className="form-wrapper">
          <form>
            <Input 
              type="text"
              label="Login"
              placeholder="Please enter username"
            />
            <Input 
              type="password"
              label="Password"
              placeholder="Please enter password"
            />
            {registered === false && <a href="#" onClick={handleForgotPassword}>Forgot password?</a>}

            {registered && 
              <p className="warning-successful">Registered! You may sign in now</p>
            }

            <div className="buttons-form">
              <button type="submit" onClick={handleClickSignIn}>Sign In</button>
              {registered === false && <button onClick={handleClickRegister}>Register</button>}
            </div>

          </form>
        </div> 
      </>
      }

      {/* Forgot Password */}
      {forgotPassword &&
        <>
          <h2>{title}</h2>
          <div className="form-wrapper">
            <p className="message-forgotPassword">Please enter e-mail used for registration to reset your password.</p>
            <form>
              <Input
                type="text"
                label="E-mail"
                placeholder="Please enter e-mail"
              />

            {sentLink && 
              <p className="warning-successful">Reset link sent. Please check your e-mail.</p>
            }

              <div className="buttons-form">
                <button type="submit" onClick={handleResetLink}>Send reset link</button>
              </div>

              <a href="#" onClick={handleReturnHome}>Go Back Home</a>

            </form>
          </div>
        </>
      }
    </div>
  )
}