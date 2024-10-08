import React from "react";
import { format, parseISO } from "date-fns";
import { activityIcon } from "./activityIcon";
import { X } from "lucide-react";

function MoodEntry({ entry, onRemove }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-4 text-gray-500 hover:text-red-500 transition-colors duration-200"
        aria-label="Remove entry"
      >
        <X size={20} />
      </button>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {format(parseISO(entry.date), "h:mm a")}
        </span>
        <span className="text-2xl mt-4 sm:mt-6" role="img" aria-label={entry.mood.label}>
          {entry.mood.emoji}
        </span>
      </div>
      <p className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        {entry.mood.label}
      </p>
      {entry.note && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {entry.note}
        </p>
      )}
      {entry.activities && entry.activities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.activities.map((activity, i) => {
            const IconComponent = activityIcon[activity] || null;
            return (
              <span
                key={i}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
              >
                {IconComponent && <IconComponent className="mr-1 h-4 w-4" />}
                {activity}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default React.memo(MoodEntry);
