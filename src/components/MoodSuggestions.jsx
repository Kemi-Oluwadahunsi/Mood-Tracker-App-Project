import React, { useContext, useMemo } from "react";
import { MoodContext } from "../contexts/MoodContext";
import { useTheme } from "../contexts/ThemeContext";
import { moodSuggestions } from "./staticComponents/suggestions";

const Suggestion = React.memo(({ text }) => {
  const { darkMode } = useTheme();
  return (
    <li className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      {text}
    </li>
  );
});

Suggestion.displayName = "Suggestion";

function MoodSuggestions() {
  const { moodEntries } = useContext(MoodContext);
  const { darkMode } = useTheme();

  const latestMood = useMemo(() => {
    if (moodEntries.length === 0) return null;
    return moodEntries[moodEntries.length - 1].mood.label;
  }, [moodEntries]);

  const currentSuggestions = useMemo(() => {
    if (!latestMood || !moodSuggestions[latestMood]) return null;
    return moodSuggestions[latestMood];
  }, [latestMood]);

  if (!currentSuggestions) {
    return null;
  }

  return (
    <div
      className={`mb-8 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Mood-Based Suggestions for {latestMood}
      </h2>
      <ul className="list-disc pl-5">
        {currentSuggestions.map((suggestion, index) => (
          <Suggestion key={index} text={suggestion} />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(MoodSuggestions);
