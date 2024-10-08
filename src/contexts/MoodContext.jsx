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
    setMoodEntries((prevEntries) => {
      const newEntries = [...prevEntries, entry];
      localStorage.setItem("moodEntries", JSON.stringify(newEntries));
      return newEntries;
    });
  }, []);

  const addCustomMood = useCallback((mood) => {
    setCustomMoods((prevMoods) => {
      const newMoods = [...prevMoods, mood];
      localStorage.setItem("customMoods", JSON.stringify(newMoods));
      return newMoods;
    });
  }, []);

  const addActivity = useCallback((activity) => {
    setActivities((prevActivities) => {
      const newActivities = [...prevActivities, activity];
      localStorage.setItem("activities", JSON.stringify(newActivities));
      return newActivities;
    });
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
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
