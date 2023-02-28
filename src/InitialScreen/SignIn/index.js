import { Input } from "./Input";
import { useState } from "react"
import "./styles.scss";

export function SignIn() {
  const [title, setTitle] = useState("Welcome");
  const [registered, setRegistered] = useState(false);
  const [sentLink, setSentLink] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);


  // Handle Functions
  const handleClickSignIn = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (username === "") {
      validate.push("The username is required.");
      setErrorMessages(validate);
    }
    if (password === "") {
      validate.push("The password is required.");
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      setErrorMessages([]);
      setRegistered(false);
      console.log("Signed In");
    }
  }

  const handleClickRegister = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (username === "") {
      validate.push("The username is required.");
      setErrorMessages(validate);
    }
    if (password === "") {
      validate.push("The password is required.");
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      setErrorMessages([]);
      setRegistered(true);
      console.log("Registered");
    }
  }

  const handleForgotPassword = () => {
    setErrorMessages([]);
    setForgotPassword(true);
    setTitle("Password Reminder");
  }

  const handleResetLink = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (email === "") {
      validate.push("The email is required.");
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      setErrorMessages([]);
      setSentLink(true);
      console.log("Password sent by email.")
    }
  }

  const handleReturnHome = () => {
    console.log("Returned Home");
    setErrorMessages([]);
    setForgotPassword(false);
    setSentLink(false);
    setTitle("Welcome");
  }

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
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
                value={username}
                handleOnChange={handleSetUsername}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Please enter password"
                value={password}
                handleOnChange={handleSetPassword}
              />

              {errorMessages.length > 0 && (
                <div className="warning-error">
                  <strong>Invalid data:</strong>
                  <ul>
                    {errorMessages.map((error, index) => (
                      <li key={index}>{error}</li>
                    )
                    )}
                  </ul>
                </div>
              )}

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
                value={email}
                handleOnChange={handleSetEmail}
              />

              {errorMessages.length > 0 && (
                <div className="warning-error">
                  <strong>Invalid data:</strong>
                  <ul>
                    {errorMessages.map((error, index) => (
                      <li key={index}>{error}</li>
                    )
                    )}
                  </ul>
                </div>
              )}

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