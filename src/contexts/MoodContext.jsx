import { createContext, useState, useEffect, useCallback } from "react";

export const MoodContext = createContext();

const defaultMoods = [
  { label: "Happy", emoji: "😄", color: "#FFD700" },
  { label: "Sad", emoji: "😢", color: "#4169E1" },
  { label: "Calm", emoji: "😊", color: "#4ade80" },
  { label: "Neutral", emoji: "😐", color: "#9ca3af" },
  { label: "Excited", emoji: "🎉", color: "#FF1493" },
  { label: "Relaxed", emoji: "🤭", color: "#98FB98" },
  { label: "Angry", emoji: "😠", color: "#FF4500" },
];

export const MoodProvider = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState(() => {
    const storedMoodEntries = localStorage.getItem("moodEntries");
    return storedMoodEntries ? JSON.parse(storedMoodEntries) : [];
  });

  const [customMoods, setCustomMoods] = useState(() => {
    const storedCustomMoods = localStorage.getItem("customMoods");
    return storedCustomMoods ? JSON.parse(storedCustomMoods) : [];
  });

  const [activities, setActivities] = useState(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  const [currentMoodEntry, setCurrentMoodEntry] = useState(null);

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem("customMoods", JSON.stringify(customMoods));
  }, [customMoods]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const addMoodEntry = useCallback((entry) => {
    setMoodEntries((prevEntries) => [...prevEntries, entry]);
    setCurrentMoodEntry(null);
  }, []);

  const addCustomMood = useCallback((mood) => {
    setCustomMoods((prevMoods) => [...prevMoods, mood]);
  }, []);

  const addActivity = useCallback((activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  }, []);

  const updateMoodEntry = useCallback((date, updates) => {
    setMoodEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.date === date ? { ...entry, ...updates } : entry
      )
    );
  }, []);

  const removeMoodEntry = useCallback((date) => {
    setMoodEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.date !== date)
    );
  }, []);

  const getAllMoods = useCallback(() => {
    return [...defaultMoods, ...customMoods];
  }, [customMoods]);

   const updateCurrentMoodEntry = useCallback((updater) => {
     setCurrentMoodEntry((prev) => {
       if (typeof updater === "function") {
         return updater(prev);
       }
       return { ...prev, ...updater };
     });
   }, []);

  return (
    <MoodContext.Provider
      value={{
        moodEntries,
        addMoodEntry,
        customMoods,
        addCustomMood,
        activities,
        addActivity,
        getAllMoods,
        updateMoodEntry,
        removeMoodEntry,
        currentMoodEntry,
        setCurrentMoodEntry,
        updateCurrentMoodEntry,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};