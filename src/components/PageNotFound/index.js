import { useNavigate } from 'react-router-dom';

import "./styles.scss";

export function PageNotFound() {
  const navigate = useNavigate();

  const handleClickReturn = () => {
    navigate("/");
  }

  return (
    <div className="pageNotFound">
      <h2>Page Not Found</h2>
      <div className="wrapper">
        <p>The page you are looking for does not exist. Please verify the address.</p>
        <button onClick={handleClickReturn}>Return to Home</button>
      </div>
    </div>

  )
}