import { useState } from "react"
import "./styles.css";

export function SignIn() {
  const [title, setTitle] = useState("Welcome");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleClickSignIn = (e) => {
    e.preventDefault();
    console.log("Sign In");
    setRegistered(false);
  }

  const handleClickRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  }

  return(
    <>
      <h2>{title}</h2>
      <div className="form-wrapper">
        <form>
          <div className="login-wrapper">
            <label htmlFor="username">Login</label>
            <input 
              id="username"
              type="text"
              placeholder="Please enter username"
              value={userName}
              onChange={(e) => {setUserName(e.target.value)}}
            />
          </div>
          
          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Please enter password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>

          <a href="#">Forgot password?</a>

          {registered && 
            <p className="warning-register">Registered! You may sign in now</p>
          }

          <div className="buttons-form">
            <button type="submit" onClick={handleClickSignIn}>Sign In</button>
            <button onClick={handleClickRegister}>Register</button>
          </div>

        </form>
      </div>
    </>
  )
}