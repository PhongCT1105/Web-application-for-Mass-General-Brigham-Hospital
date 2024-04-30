import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import bit_wong from "@/assets/8bit_wong.gif";

const Screensaver: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [isActive, setIsActive] = useState(false);
  const [isLogoActive, setIsLogoActive] = useState(false); // New state variable for logo

  const LogoWidth = 100;
  const LogoHeight = 100;
  const screensaverTimeout = useRef<number | undefined>();

  useEffect(() => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    const resetTimer = () => {
      clearTimeout(screensaverTimeout.current);
      screensaverTimeout.current = window.setTimeout(
        () => setIsActive(true),
        30000,
      );
      setIsActive(false);
    };

    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    resetTimer();

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLogoActive(true), 3000);

    const intervalId = setInterval(() => {
      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;

      if (newX < 0 || newX + LogoWidth > window.innerWidth) {
        setVelocity({ x: -velocity.x, y: velocity.y });
        newX = position.x - velocity.x;
      }

      if (newY < 0 || newY + LogoHeight > window.innerHeight) {
        setVelocity({ x: velocity.x, y: -velocity.y });
        newY = position.y - velocity.y;
      }

      setPosition({ x: newX, y: newY });
    }, 20);

    return () => clearInterval(intervalId);
  }, [isActive, position, velocity]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('https://cdna.artstation.com/p/assets/images/images/061/839/704/original/ryan-haight-japanese-garden-large.gif?1681758583')`,
        backgroundSize: "cover",
        display: isActive ? "block" : "none",
        zIndex: 9999,
      }}
    >
      {isLogoActive && (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            width: LogoWidth,
            height: LogoHeight,
            backgroundImage: `url(${bit_wong})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        ></div>
      )}
      <ReactPlayer
        url="https://youtu.be/xYhFo_Ta-bM"
        playing={isActive}
        volume={1}
        muted={false}
        width={0}
        height={0}
      />
    </div>
  );
};

export default Screensaver;
