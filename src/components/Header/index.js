import "./styles.scss";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Signed Out");
    navigate("/");
  };

  return (
    <header className="main">
      <div className="title">
        <h1>QUIZ Maker</h1>
        <p>Dashboard</p>
      </div>
      <button onClick={handleSignOut} title="Sign Out" className="sign-out">
        Sign out
      </button>
    </header>
  );
}
