import { Input } from './Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';
import { apiURL } from "../../../shared/constants";

export function SignIn() {
  const [title, setTitle] = useState('Welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sentLink, setSentLink] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();

  /**
   * Sign In Handling function
   */
  const handleClickSignIn = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (email === '') {
      validate.push('The email is required.');
      setErrorMessages(validate);
    }
    if (password === '') {
      validate.push('The password is required.');
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      axios
        .post(`${apiURL}users/login`, {
          email,
          password,
        })
        .then((res) => {
          setErrorMessages([]);
          setRegistered(false);
          localStorage.setItem('userId', res.data[0].ownerId);
          navigate('/dashboard', { state: res.data });
        })
        .catch((err) => {
          validate.push(err.response.data);
          setErrorMessages(validate);
        });
    }
  };

  /**
   * Register Handling function
   */
  const handleClickRegister = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (email === '') {
      validate.push('The email is required.');
      setErrorMessages(validate);
    }
    if (password === '') {
      validate.push('The password is required.');
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      // Using axios to send a POST request to our API
      axios
        .post(apiURL, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data.message);
          setErrorMessages([]);
          setRegistered(true);
          console.log('Registered');
        })
        .catch((err) => {
          validate.push(err.response.data);
          setErrorMessages(validate);
        });
    }
  };

  /**
   * Forgot Password Handling function
   */
  const handleForgotPassword = () => {
    setErrorMessages([]);
    setForgotPassword(true);
    setTitle('Password Reminder');
  };

  /**
   * Reset Password Handling function
   */
  const handleResetLink = (e) => {
    e.preventDefault();

    // Validate the data
    const validate = [];

    if (email === '') {
      setSentLink(false);
      validate.push('The email is required.');
      setErrorMessages(validate);
    }
    if (validate.length === 0) {
      axios
        .post(`${apiURL}users/passwordreset`, {
          email,
        })
        .then((res) => {
          setErrorMessages([]);
          setSentLink(true);
          console.log('Password sent by email.');
        })
        .catch((err) => {
          validate.push(err.response.data);
          setErrorMessages(validate);
        });
    }
  };

  /**
   * Return to Home Handling function
   */
  const handleReturnHome = () => {
    console.log('Returned Home');
    setErrorMessages([]);
    setForgotPassword(false);
    setSentLink(false);
    setTitle('Welcome');
  };

  // Handling input useState functions
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="signIn-page">
      {/* Sign In and Register */}
      {forgotPassword === false && (
        <>
          <h2>{title}</h2>
          <div className="form-wrapper">
            <form>
              <Input
                type="text"
                label="Login"
                placeholder="Please enter email"
                value={email}
                handleOnChange={handleSetEmail}
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
                    ))}
                  </ul>
                </div>
              )}

              {registered === false && (
                <p className="nav-initialScreen" onClick={handleForgotPassword}>
                  Forgot password?
                </p>
              )}

              {registered && (
                <p className="warning-successful">
                  Registered! You may sign in now
                </p>
              )}

              <div className="buttons-form">
                <button type="submit" onClick={handleClickSignIn}>
                  Sign In
                </button>
                {registered === false && (
                  <button onClick={handleClickRegister}>Register</button>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {/* Forgot Password */}
      {forgotPassword && (
        <>
          <h2>{title}</h2>
          <div className="form-wrapper">
            <p className="message-forgotPassword">
              Please enter e-mail used for registration to reset your password.
            </p>
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
                    ))}
                  </ul>
                </div>
              )}

              {sentLink && (
                <p className="warning-successful">
                  Reset link sent. Please check your e-mail.
                </p>
              )}

              <div className="buttons-form">
                <button type="submit" onClick={handleResetLink}>
                  Send reset link
                </button>
              </div>

              <p className="nav-initialScreen" onClick={handleReturnHome}>
                Go Back Home
              </p>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
