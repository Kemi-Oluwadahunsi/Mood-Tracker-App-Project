import { useState, useContext } from "react";
import { MoodContext } from "../contexts/MoodContext";
import { EmojiChart } from "./staticComponents/EmojiChart";

function CustomMoodLabels() {
  const moodContext = useContext(MoodContext);
  const [showEmojiChart, setShowEmojiChart] = useState(false);
  const [newMood, setNewMood] = useState({ label: "", emoji: "", color: "" });

  if (!moodContext) {
    console.error("MoodContext is not available");
    return <div>Error: MoodContext is not available</div>;
  }

  const { customMoods, addCustomMood } = moodContext;

  const handleEmojiSelect = (emoji) => {
    setNewMood((prev) => ({ ...prev, emoji }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMood.label && newMood.emoji && newMood.color) {
      if (typeof addCustomMood === "function") {
        addCustomMood(newMood);
        setNewMood({ label: "", emoji: "", color: "" });
      } else {
        console.error("addCustomMood is not a function");
      }
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="mb-4 w-full">
        <h3 className="text-lg sm:text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
          Add Custom Mood
        </h3>
        <div className="mb-2">
          <label
            htmlFor="moodLabel"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300  "
          >
            Mood Label
          </label>
          <input
            type="text"
            id="moodLabel"
            value={newMood.label}
            onChange={(e) =>
              setNewMood((prev) => ({ ...prev, label: e.target.value }))
            }
            className="p-2 rounded-md border border-gray-300 dark:border-none shadow-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
            required
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="mb-2 w-full">
            <label
              htmlFor="moodEmoji"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mood Emoji
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="moodEmoji"
                value={newMood.emoji}
                onChange={(e) =>
                  setNewMood((prev) => ({ ...prev, emoji: e.target.value }))
                }
                className="w-1/2 sm:w-3/4 p-2 rounded-md border border-gray-300 dark:border-none shadow-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowEmojiChart(true)}
                className="w-1/2 sm:w-1/4 ml-2 bg-indigo-600 text-white text-sm sm:text-base py-3 sm:py-2 px-2 sm:px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Choose Emoji
              </button>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="moodColor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mood Color (e.g., #FF0000 for red)
          </label>
          <input
            type="color"
            id="moodColor"
            value={newMood.color}
            onChange={(e) =>
              setNewMood((prev) => ({ ...prev, color: e.target.value }))
            }
            className="w-full p-1 border rounded-md dark:bg-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Add Custom Mood
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.isArray(customMoods) && customMoods.length > 0 ? (
          customMoods.map((mood, index) => (
            <div
              key={index}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: mood.color }}
            >
              <span className="text-3xl" role="img" aria-label={mood.label}>
                {mood.emoji}
              </span>
              <p className="mt-2 text-sm font-medium">{mood.label}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No custom moods added yet.
          </p>
        )}
      </div>

      {showEmojiChart && (
        <EmojiChart
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmojiChart(false)}
        />
      )}
    </div>
  );
}

export default CustomMoodLabels;
