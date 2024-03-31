import React, { useEffect } from "react";
import "../styles/HeroPage.css";

const RedirectOnClick: React.FC = () => {
  useEffect(() => {
    const handleClick = () => {
      window.location.href = "/login";
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="page full-screen clickBox">
      <div className="header-container">
        <h1 className="headerHero">Need Directions?</h1>
        <br />
        <p>Click Anywhere to Start!</p>
      </div>
    </div>
  );
};

export default RedirectOnClick;
