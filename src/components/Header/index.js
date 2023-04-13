import './styles.scss';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('Signed Out');
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="main">
      <NavLink to="/">
        <div className="title">
            <h1>QUIZ Maker</h1>
            <p>Dashboard</p>
        </div>
      </NavLink>
      <button onClick={handleSignOut} title="Sign Out" className="sign-out">
        Sign out
      </button>
    </header>
  );
}
