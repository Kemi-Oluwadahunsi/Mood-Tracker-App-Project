import React, { useCallback, useContext, useMemo } from "react";
import { MoodContext } from "../contexts/MoodContext";
import { format, parseISO } from "date-fns";
import MoodEntry from "./staticComponents/MoodEntry";

function RecentEntries() {
  const { moodEntries, removeMoodEntry } = useContext(MoodContext);

  const groupedEntries = useMemo(() => {
    return moodEntries.reduce((acc, entry) => {
      const date = format(parseISO(entry.date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
  }, [moodEntries]);

  const handleRemoveEntry = useCallback(
    (entryDate) => {
      removeMoodEntry(entryDate);
      alert("Mood entry removed successfully");
    },
    [removeMoodEntry]
  );

  return (
    <div className="mt-12">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Recent Entries
      </h2>
      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-8 mx-auto">
        {Object.entries(groupedEntries)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
          .map(([date, entries]) => (
            <div
              key={date}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {format(parseISO(date), "MMMM d, yyyy")}
              </h3>
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <MoodEntry
                    key={`${date}-${index}`}
                    entry={entry}
                    onRemove={() => handleRemoveEntry(entry.date)}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default React.memo(RecentEntries);
