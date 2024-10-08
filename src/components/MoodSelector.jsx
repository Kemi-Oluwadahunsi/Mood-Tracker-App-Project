import { useState, useContext, useCallback, useEffect } from "react";
import { MoodContext } from "../contexts/MoodContext";
import MoodButton from "./staticComponents/MoodButton";

function MoodSelector() {
  const { addMoodEntry, getAllMoods } = useContext(MoodContext);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [allMoods, setAllMoods] = useState([]);

  useEffect(() => {
    const moods = getAllMoods();
    setAllMoods(moods);
  }, [getAllMoods]);

  const handleMoodSelect = useCallback((mood) => {
    setSelectedMood(mood);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedMood) {
        const newEntry = {
          mood: selectedMood,
          note: note,
          date: new Date().toISOString(),
        };
        addMoodEntry(newEntry);
        alert("Mood added! Check Recent entries");
        setSelectedMood(null);
        setNote("");
      }
    },
    [selectedMood, note, addMoodEntry]
  );

  if (allMoods.length === 0) {
    return <div>Loading moods...</div>;
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          How are you feeling?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-4">
          {allMoods.map((mood) => (
            <MoodButton
              key={mood.label}
              mood={mood}
              onClick={handleMoodSelect}
              isSelected={selectedMood === mood}
            />
          ))}
        </div>
        {selectedMood && (
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
                className="mt-1 px-4 block w-full rounded-md border border-gray-300 dark:border-none shadow-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
    </>
  );
}

export default MoodSelector;
