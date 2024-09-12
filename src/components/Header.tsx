import '../css/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Mel's Memory Game</h1>
      </div>
      <div 
        className="reset-button"
        onClick={() => window.location.reload()}
      >
        Reset Game
      </div>
    </header>
  );
};

export default Header;