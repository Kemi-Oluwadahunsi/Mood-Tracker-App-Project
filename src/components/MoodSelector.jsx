import React, { useState, useContext, useCallback } from "react";
import { MoodContext } from "../contexts/MoodContext";
import MoodButton from "./staticComponents/MoodButton";
import { toast } from "sonner"

function MoodSelector() {
  const {
    addMoodEntry,
    getAllMoods,
    currentMoodEntry,
    updateCurrentMoodEntry,
  } = useContext(MoodContext);
  const [note, setNote] = useState("");

  const allMoods = getAllMoods();

  const handleMoodSelect = useCallback(
    (mood) => {
      updateCurrentMoodEntry({
        mood,
        date: new Date().toISOString(),
        activities: [],
        note: "",
      });
    },
    [updateCurrentMoodEntry]
  );

  const handleNoteChange = useCallback(
    (e) => {
      setNote(e.target.value);
      updateCurrentMoodEntry((prev) => ({
        ...prev,
        note: e.target.value,
      }));
    },
    [updateCurrentMoodEntry]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (currentMoodEntry && currentMoodEntry.mood) {
        addMoodEntry(currentMoodEntry);
        toast.success("Mood added! Check Recent entries");
        updateCurrentMoodEntry(null);
        setNote("");
      }
    },
    [currentMoodEntry, addMoodEntry, updateCurrentMoodEntry]
  );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        How are you feeling?
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-4">
        {allMoods.map((mood) => (
          <MoodButton
            key={mood.label}
            mood={mood}
            onClick={() => handleMoodSelect(mood)}
            isSelected={currentMoodEntry?.mood === mood}
          />
        ))}
      </div>
      {currentMoodEntry && currentMoodEntry.mood && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Add a note (optional)
            </label>
            <textarea
              id="note"
              rows="3"
              className="mt-1 block px-2 py-2 lg:px-4 w-full rounded-md border border-gray-300 dark:border-none shadow-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={note}
              onChange={handleNoteChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Log Mood
          </button>
        </form>
      )}


      
    </div>
  );
}

export default React.memo(MoodSelector);