import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { MoodContext } from "../contexts/MoodContext";
import { activityIcon} from "./staticComponents/activityIcon";
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
  const { moodEntries, updateMoodEntry, activities, addActivity } =
    useContext(MoodContext);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");

  const lastEntry = useMemo(() => {
    return moodEntries.length > 0 ? moodEntries[moodEntries.length - 1] : null;
  }, [moodEntries]);

  useEffect(() => {
    if (lastEntry && lastEntry.activities) {
      setSelectedActivities(lastEntry.activities);
    }
  }, [lastEntry]);

  const handleActivityToggle = useCallback(
    (activity) => {
      setSelectedActivities((prev) => {
        const newActivities = prev.includes(activity)
          ? prev.filter((a) => a !== activity)
          : [...prev, activity];

        if (lastEntry) {
          updateMoodEntry(lastEntry.date, { activities: newActivities });
        }

        return newActivities;
      });
    },
    [lastEntry, updateMoodEntry]
  );

  const handleCustomActivityAdd = useCallback(
    (e) => {
      e.preventDefault();
      if (customActivity && !activities.includes(customActivity)) {
        addActivity(customActivity);
        setSelectedActivities((prev) => {
          const newActivities = [...prev, customActivity];
          if (lastEntry) {
            updateMoodEntry(lastEntry.date, { activities: newActivities });
          }
          return newActivities;
        });
        setCustomActivity("");
      }
    },
    [customActivity, activities, addActivity, lastEntry, updateMoodEntry]
  );

  const allActivities = useMemo(
    () => [...defaultActivities, ...activities],
    [activities]
  );

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
            isSelected={selectedActivities.includes(activity)}
            onToggle={handleActivityToggle}
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
