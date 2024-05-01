import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import Wong from "@/assets/profwonglasereyes.png";
import All from "@/assets/All_achievements.png";
import BigSpender from "@/assets/Big_Spender.png";
import Bathroom from "@/assets/Cleaned_the_bathroom.png";
import Lucky from "@/assets/Feeling_Lucky.png";
import FirstPath from "@/assets/Found_First_Path.png";
import Mina from "@/assets/WAH.png";
import Map from "@/assets/map.png";
import File from "@/assets/file.png";
import Dismiss from "@/assets/dismiss.png";
import Pill from "@/assets/pills.png";
import Beginning from "@/assets/beginning.png";
import Henry from "@/assets/nervouscat.png";
import Shettler from "@/assets/Ukulele.png";
import June from "@/assets/explodinghead.png";
import Glasses from "@/assets/lensmakers.png";
import Skull from "@/assets/skull.png";
import Awesome from "@/assets/awesome.png";

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

// Object containing achievements with their corresponding images
const achievementsWithImages: Record<string, string> = {
  "Pathfinding Pioneer": FirstPath,
  "Chance Trailblazer": Lucky,
  "Big Spender": BigSpender,
  "Wong Achievement": Wong,
  "All Achievements Discovered": All,
  "Cartographer Apprentice": Map,
  "File Pioneer": File,
  "Selective Visionary": Dismiss,
  "Mina Achievement": Mina,
  "Henry Achievement": Henry,
  "Shettler Achievement": Shettler,
  "June Achievement": June,
  "Bathroom Whisperer": Bathroom,
  "Medication Maverick": Pill,
  "Inaugural Explorer": Beginning,
  "Dark Mode Achievement": Glasses,
  "Error Achievement": Skull,
  "Awesome Achievement": Awesome,
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
  const totalAchievements = 17; // total # of achievements - 1!
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
        // Get the image for the achievement
        const image = achievementsWithImages[achievement];
        if (image) {
          // Trigger the toast notification with the image
          toast({
            description: (
              <div className="flex items-center justify-center">
                <div className="pr-5">
                  <img src={image} alt="Achievement" className="w-16 h-16" />
                </div>
                <div>
                  <h1 className="text-base font-bold mb-1">
                    Achievement Unlocked
                  </h1>
                  <p className="text-sm">{achievement}</p>
                </div>
              </div>
            ),
          });
        }
      }
    },
    [achievements, toast],
  );

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
      triggerAchievement("All Achievements Discovered");
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
