import axios from "axios";
import { apiURL } from "./../../shared/constants";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./styles.scss";

export function VerifyPage() {
  const navigate = useNavigate();
  const {token, userId} = useParams();
  const [verified, setVerified] = useState(false);

  const handleClickReturn = () => {
    navigate("/");
  }

  useEffect(() => {
    (async () => {
      await axios
        .post(`${apiURL}users/verify`, {
          token,
          userId
        })
        .then((res) => {
          setVerified(true);
        })
        .catch((error) => {
          console.warn(error);
        });
    })();
  }, [token, userId]);

  return (
    <div className="verifyPage">
      {verified && 
        (
          <>
            <h2>Email Verified</h2>
              <div className="wrapper">
                <p>Thank you for registering and verifying your email. Please, sign in to create or answer your first quiz.</p>
                <button onClick={handleClickReturn}>Log In</button>
              </div>
          </>
        )
      }

      {!verified &&
        (
          <>
            <h2>Something wrong happened</h2>
              <div className="wrapper">
                <p>Your information does not seem valid. Please, try again or contact support.</p>
                <button onClick={handleClickReturn}>Go to Home</button>
              </div>
          </>
        )
      }
    </div>

  )
}