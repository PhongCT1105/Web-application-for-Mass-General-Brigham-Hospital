import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useAutoLogout = (milliseconds: number) => {
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    let timerId: number | undefined;
    if (isAuthenticated) {
      const events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
      ];

      const resetTimer = () => {
        clearTimeout(timerId);
        timerId = window.setTimeout(logout, milliseconds);
      };

      for (const i in events) {
        window.addEventListener(events[i], resetTimer);
      }

      resetTimer();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [logout, isAuthenticated, milliseconds]);
};

export default useAutoLogout;
