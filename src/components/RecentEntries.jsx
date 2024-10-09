

import React, { useCallback, useContext, useMemo, useState } from "react";
import { MoodContext } from "../contexts/MoodContext";
import {
  format,
  parseISO,
  isValid,
  isSameDay,
} from "date-fns";
import { useSwipeable } from "react-swipeable";
import MoodEntry from "./staticComponents/MoodEntry";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner"

function RecentEntries() {
  const { moodEntries, removeMoodEntry, currentMoodEntry } =
    useContext(MoodContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const groupedEntries = useMemo(() => {
    const entries = currentMoodEntry
      ? [currentMoodEntry, ...moodEntries]
      : moodEntries;
    return entries.reduce((acc, entry) => {
      if (entry && entry.date) {
        const parsedDate = parseISO(entry.date);
        if (isValid(parsedDate)) {
          const date = format(parsedDate, "yyyy-MM-dd");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(entry);
        }
      }
      return acc;
    }, {});
  }, [moodEntries, currentMoodEntry]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedEntries).sort(
      (a, b) => new Date(b) - new Date(a)
    );
  }, [groupedEntries]);

  const currentDateIndex = sortedDates.findIndex((date) =>
    isSameDay(parseISO(date), currentDate)
  );

  const handleRemoveEntry = useCallback(
    (entryDate) => {
      removeMoodEntry(entryDate);
      toast.success("Mood entry removed successfully");
    },
    [removeMoodEntry]
  );

  const handlePrevDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const prevIndex = currentDateIndex + 1;
      return prevIndex < sortedDates.length
        ? parseISO(sortedDates[prevIndex])
        : prevDate;
    });
  }, [currentDateIndex, sortedDates]);

  const handleNextDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const nextIndex = currentDateIndex - 1;
      return nextIndex >= 0 ? parseISO(sortedDates[nextIndex]) : prevDate;
    });
  }, [currentDateIndex, sortedDates]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextDay,
    onSwipedRight: handlePrevDay,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const currentDateString = format(currentDate, "yyyy-MM-dd");
  const currentEntries = groupedEntries[currentDateString] || [];
  const isCurrentDateToday = isSameDay(currentDate, new Date());
  const hasPreviousEntries = currentDateIndex < sortedDates.length - 1;
  const hasNextEntries = currentDateIndex > 0 && !isCurrentDateToday;

  return (
    <div className="mt-12" {...swipeHandlers}>
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Recent Entries
      </h2>
      <div className="relative">
        {hasPreviousEntries && (
          <button
            onClick={handlePrevDay}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {hasNextEntries && (
          <button
            onClick={handleNextDay}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mx-12">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            {format(currentDate, "MMMM d, yyyy")}
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {currentEntries.length > 0 ? (
              currentEntries.map((entry, index) => (
                <MoodEntry
                  key={`${currentDateString}-${index}`}
                  entry={entry}
                  onRemove={
                    entry === currentMoodEntry
                      ? null
                      : () => handleRemoveEntry(entry.date)
                  }
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No entries for this date.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(RecentEntries);