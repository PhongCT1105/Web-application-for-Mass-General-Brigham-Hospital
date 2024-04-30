import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useToast } from "@/components/ui/use-toast.ts";

// Define the shape of the context value
interface AchievementContextType {
  achievements: string[];
  triggerAchievement: (achievement: string) => void;
}

// Default value for the context
const defaultValue: AchievementContextType = {
  achievements: [],
  // eslint-disable-next-line no-empty-function
  triggerAchievement: () => {},
};

// Object containing achievements with their corresponding messages
const achievementsWithMessages: Record<string, string> = {
  "Pathfinding Pioneer":
    "You've taken your first step in navigation, charting a course into the unknown. Embrace the thrill of discovery as you blaze trails to new destinations!",
  "Chance Trailblazer":
    "By clicking 'Feeling Lucky,' you've stumbled upon new paths and adventures. Keep clicking and exploring!",
  "Big Spender":
    "Your flower requests have blossomed into something truly special. Your generosity knows no bounds – keep blooming brightly!",
  "Wong Achievement":
    "No nothing is Wong, you've just stumbled upon an achievement for getting to know professor Wong!",
  "All Achievements Discovered":
    "You have discovered every achievement! Thank you so much for exploring our application, we hope you enjoyed the journey!",
  "Cartographer Apprentice":
    "Your first map edit signifies the beginning of a new journey. Your contributions shape our understanding of the world – keep exploring and editing!",
  "File Pioneer":
    "Your first upload marks the beginning of a new chapter. Your contributions are the building blocks of our shared knowledge – keep uploading and inspiring!",
  "Selective Visionary":
    "Your first dismissal shows that you're not afraid to filter out what doesn't resonate. Keep honing your focus and embracing what truly matters to you!",
  "Mina Achievement": "WAH WAH WAH!",
  "Henry Achievement": "gulp",
  "Bathroom Whisperer":
    "Your professional touch has turned bathrooms into sparkling retreats. Clients will revel in the freshness you bring – keep shining brightly!",
  "Medication Maverick":
    "You're not just prescribing, you're orchestrating a symphony of pharmaceutical solutions! Keep rocking those Rx pads!",
  "Inaugural Explorer":
    "By testing the very first path ever given to our application, you've embarked on a journey of discovery.",
  // Add more achievements here
};

// Create the context with explicit typing
const AchievementContext = createContext<AchievementContextType>(defaultValue);

// Props type for the AchievementProvider component
interface AchievementProviderProps {
  children: ReactNode;
}

// Provider component
export const AchievementProvider: React.FC<AchievementProviderProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const totalAchievements = 12; // total # of achievements - 1!
  // State to manage achievements
  const [achievements, setAchievements] = useState<string[]>([]);

  // Function to trigger an achievement
  const triggerAchievement = useCallback(
    (achievement: string) => {
      if (!achievements.includes(achievement)) {
        setAchievements((prevAchievements) => [
          ...prevAchievements,
          achievement,
        ]);
        // Get the message for the achievement
        const message = achievementsWithMessages[achievement];
        if (message) {
          // Trigger the toast notification with the message
          toast({
            title: "Achievement Unlocked",
            description: message,
          });
        }
      }
    },
    [achievements, toast],
  ); // Include dependencies in useCallback's dependency array

  // Effect to load achievements from browser storage on component mount
  useEffect(() => {
    const storedAchievements = localStorage.getItem("achievements");
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  // Effect to update browser storage when achievements change
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    if (achievements.length === totalAchievements) {
      setTimeout(() => {
        triggerAchievement("All Achievements Discovered");
      }, 6000);
      // Trigger the "all achievements discovered" achievement
    }
  }, [achievements, totalAchievements, triggerAchievement]);

  // Memoized context value
  const contextValue = React.useMemo(
    () => ({ achievements, triggerAchievement }),
    [achievements, triggerAchievement],
  );

  return (
    <AchievementContext.Provider value={contextValue}>
      {children}
    </AchievementContext.Provider>
  );
};

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAchievements = () => useContext(AchievementContext);
