import React, { useContext, useMemo } from "react";
import { MoodContext } from "../contexts/MoodContext";
import { endOfWeek, format, startOfWeek, eachDayOfInterval } from "date-fns";
import Chart from "./staticComponents/Chart";

const moods = [
  { emoji: "😄", label: "Happy", value: 7 },
  { emoji: "🎉", label: "Excited", value: 6 },
  { emoji: "😊", label: "Calm", value: 5 },
  { emoji: "😌", label: "Relaxed", value: 4 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😔", label: "Sad", value: 2 },
  { emoji: "😠", label: "Angry", value: 1 },
];

function MoodStatistics() {
  const { moodEntries } = useContext(MoodContext);

  const moodStats = useMemo(() => {
    const stats = {};
    moodEntries.forEach((entry) => {
      if (entry && entry.mood) {
        const label = entry.mood.label;
        if (stats[label]) {
          stats[label]++;
        } else {
          stats[label] = 1;
        }
      }
    });
    return Object.entries(stats).map(([mood, count]) => ({ mood, count }));
  }, [moodEntries]);

  const mostFrequentMood = useMemo(() => {
    return moodStats.reduce((a, b) => (a.count > b.count ? a : b), {
      mood: "",
      count: 0,
    });
  }, [moodStats]);

  const weeklyMoodTrend = useMemo(() => {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today);
    const endOfWeekDate = endOfWeek(today);

    const daysOfWeek = eachDayOfInterval({
      start: startOfWeekDate,
      end: endOfWeekDate,
    });

    return daysOfWeek.map((day) => {
      const dayStr = format(day, "EEE");
      const dayMoods = moodEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return format(entryDate, "EEE") === dayStr;
      });

      const moodValues = dayMoods
        .map((entry) => {
          const mood = moods.find((m) => m.label === entry.mood.label);
          return mood ? mood.value : 0;
        })
        .filter((value) => value !== 0);

      const averageMood =
        moodValues.length > 0
          ? moodValues.reduce((sum, value) => sum + value, 0) /
            moodValues.length
          : null;

      return {
        date: dayStr,
        averageMood:
          averageMood !== null ? Number(averageMood.toFixed(2)) : null,
      };
    });
  }, [moodEntries]);

  if (moodEntries.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No mood data available yet. Start logging your moods to see
          statistics!
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Mood Statistics
      </h2>

      <div className="mb-6">
        <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Most Frequent Mood
        </h3>
        <p className="text-sm sm:text-lg  text-gray-700 dark:text-gray-300">
          {mostFrequentMood.mood} ({mostFrequentMood.count} times)
        </p>
      </div>

      {moodStats.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Mood Distribution
          </h3>
          <Chart data={moodStats} type="pie" />
        </div>
      )}

      {weeklyMoodTrend.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Weekly Mood Trend
          </h3>
          <Chart data={weeklyMoodTrend} type="bar" />
        </div>
      )}
    </div>
  );
}

export default React.memo(MoodStatistics);
