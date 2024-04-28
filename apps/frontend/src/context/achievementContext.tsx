// achievementContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the context value
interface AchievementContextType {
  achievements: string[]; // Or whatever type you're using for achievements
  triggerAchievement: (achievement: string) => void;
}

// Default value for the context
const defaultValue: AchievementContextType = {
  achievements: [],
  // eslint-disable-next-line no-empty-function
  triggerAchievement: () => {}, // Placeholder function
};

// Create the context with explicit typing
const AchievementContext = createContext<AchievementContextType>(defaultValue);

// Props type for the AchievementProvider component
interface AchievementProviderProps {
  children: React.ReactNode;
}

// Provider component
export const AchievementProvider: React.FC<AchievementProviderProps> = ({
  children,
}) => {
  // State to manage achievements
  const [achievements, setAchievements] = useState<string[]>([]);

  // Function to trigger an achievement
  const triggerAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      // If the achievement has not been achieved before, trigger it
      setAchievements((prevAchievements) => [...prevAchievements, achievement]);
    }
  };

  // Effect to load achievements from browser storage on component mount
  useEffect(() => {
    console.log("Fetching achievements from local storage...");
    const storedAchievements = localStorage.getItem("achievements");
    if (storedAchievements) {
      console.log("Stored achievements found:", storedAchievements);
      setAchievements(JSON.parse(storedAchievements));
    } else {
      console.log("No stored achievements found.");
    }
  }, []);

  // Effect to update browser storage when achievements change
  useEffect(() => {
    console.log("Updating local storage with achievements:", achievements);
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [achievements]);

  return (
    <AchievementContext.Provider value={{ achievements, triggerAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAchievements = () => useContext(AchievementContext);
