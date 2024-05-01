import React from "react";
import "leaflet/dist/leaflet.css";
import { useAchievements } from "@/context/achievementContext.tsx";
import { Button } from "@/components/ui/button.tsx";

const ErrorPage: React.FC = () => {
  const { triggerAchievement } = useAchievements();

  function handleErrorAchievement() {
    triggerAchievement("Error Achievement");
  }

  function handleAwesomeAchievement() {
    triggerAchievement("Awesome Achievement");
  }

  handleErrorAchievement();
  return (
    <div
      className="dark flex flex-col h-screen justify-center items-center"
      style={{
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-300">
        We're sorry, but an error occurred while processing your request.
      </p>
      <p className="text-lg" style={{ color: "hsl(var(--background))" }}>
        Team Awesome was here
      </p>
      <Button
        variant={"ghost"}
        className="text-lg"
        style={{ color: "hsl(var(--background))" }}
        onClick={handleAwesomeAchievement}
      >
        Team Awesome was here
      </Button>
    </div>
  );
};

export default ErrorPage;
