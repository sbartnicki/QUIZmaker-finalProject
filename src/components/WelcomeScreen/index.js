import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
      <>
        <h1>QUIZ Maker</h1>
        <Link to='/dashboard'>Dashboard</Link>
      </>
  );
};

export default WelcomeScreen;
