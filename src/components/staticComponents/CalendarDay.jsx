import React from "react";
import { format } from "date-fns";

const CalendarDay = ({ day, moodEntry, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(day)}
    className={`p-2 text-center rounded-lg ${
      moodEntry ? moodEntry.mood.color : "bg-gray-200 dark:bg-gray-700"
    } ${isSelected ? "ring-2 ring-indigo-500" : ""}`}
    aria-label={`Select date: ${format(day, "MMMM d, yyyy")}`}
  >
    <span className="block text-sm">{format(day, "d")}</span>
    {moodEntry && (
      <span
        className="block text-2xl"
        role="img"
        aria-label={moodEntry.mood.label}
      >
        {moodEntry.mood.emoji}
      </span>
    )}
  </button>
);

export default React.memo(CalendarDay);