import React, { useState, useContext, useCallback, useMemo } from "react";
import { MoodContext } from "../contexts/MoodContext";
import { activityIcon } from "./staticComponents/activityIcon";
import ActivityButton from "./staticComponents/ActivityButton";

const defaultActivities = [
  "Exercise",
  "Good sleep",
  "Work",
  "Socializing",
  "Reading",
  "Meditation",
  "Hobby",
  "Eating",
  "Watching Movies",
  "Gaming",
  "Traveling",
  "Shopping",
  "Listening to Music",
];

function ActivityTracker() {
  const { activities, addActivity, currentMoodEntry, updateCurrentMoodEntry } =
    useContext(MoodContext);
  const [customActivity, setCustomActivity] = useState("");

  const handleActivityToggle = useCallback(
    (activity) => {
      updateCurrentMoodEntry((prev) => {
        if (!prev) return null;
        const currentActivities = prev.activities || [];
        const newActivities = currentActivities.includes(activity)
          ? currentActivities.filter((a) => a !== activity)
          : [...currentActivities, activity];
        return { ...prev, activities: newActivities };
      });
    },
    [updateCurrentMoodEntry]
  );

  const handleCustomActivityAdd = useCallback(
    (e) => {
      e.preventDefault();
      if (customActivity && !activities.includes(customActivity)) {
        addActivity(customActivity);
        updateCurrentMoodEntry((prev) => {
          if (!prev) return null;
          const currentActivities = prev.activities || [];
          return {
            ...prev,
            activities: [...currentActivities, customActivity],
          };
        });
        setCustomActivity("");
      }
    },
    [customActivity, activities, addActivity, updateCurrentMoodEntry]
  );

  const allActivities = useMemo(
    () => [...defaultActivities, ...activities],
    [activities]
  );

  if (!currentMoodEntry || !currentMoodEntry.mood) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Activities
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {allActivities.map((activity) => (
          <ActivityButton
            key={activity}
            activity={activity}
            Icon={activityIcon[activity]}
            isSelected={currentMoodEntry.activities?.includes(activity)}
            onToggle={() => handleActivityToggle(activity)}
          />
        ))}
      </div>
      <form onSubmit={handleCustomActivityAdd} className="mb-4">
        <label htmlFor="custom-activity" className="sr-only">
          Add custom activity
        </label>
        <input
          id="custom-activity"
          type="text"
          value={customActivity}
          onChange={(e) => setCustomActivity(e.target.value)}
          placeholder="Add custom activity"
          className="w-full py-2 px-4 rounded-md border border-gray-300 dark:border-none shadow-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Add Custom Activity
        </button>
      </form>
    </div>
  );
}

export default React.memo(ActivityTracker);