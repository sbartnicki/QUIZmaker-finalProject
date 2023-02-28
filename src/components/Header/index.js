import "./styles.scss";

export default function Header() {
  const handleSignOut = () => {};

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
