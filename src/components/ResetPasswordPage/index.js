import axios from "axios";
import { useState } from 'react';
import { apiURL } from "./../../shared/constants";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../InitialScreen/SignIn/Input';

import "./styles.scss";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const {token, userId} = useParams();

  const [errorMessages, setErrorMessages] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState(false);

  const validate = [];

  const handleClickReturn = () => {
    navigate("/");
  }

  const handleSetPassword = (e) => {
    setNewPassword(e.target.value);
    setErrorMessages([]);
  }

  const settingNewPassword = async () => {
    await axios
      .post(`${apiURL}resets/password`, {
        token,
        userId,
        newPassword
      })
      .then((res) => {
        setUpdatedPassword(true);
      })
      .catch((error) => {
        console.warn(error);
        validate.push("Something went wrong. Please try again or contact support.");
        setErrorMessages(validate);  
      });
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (newPassword === "") {
      validate.push("The password is required.");
      setErrorMessages(validate);
    }

    else {
      setErrorMessages([]);
      settingNewPassword();
      setNewPassword("");
    }
  }
  

  return (
    <div className="resetPasswordPage">
      <h2>Reset Password</h2>
      <div className="wrapper">
        {!updatedPassword &&
          (
            <form>
              <Input
                type="password"
                label="Password"
                placeholder="Please enter new password"
                value={newPassword}
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

              <div className="buttons-form">
                <button type="submit" onClick={handleChangePassword}>Update Password</button>
              </div>

            </form>
          )
        }

        {updatedPassword &&
          (
            <>
              <p>Password updated successfully!</p>
              <button onClick={handleClickReturn}>Sign In</button>
            </>
          )
        }
      </div>
    </div>

  )
}