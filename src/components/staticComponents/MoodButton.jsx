import React from "react";

const MoodButton = React.memo(({ mood, onClick, isSelected }) => {
  if (!mood) {
    return null; // Don't render anything if mood is undefined
  }

  const { label, emoji, color } = mood;
  const backgroundColor = color || "#CCCCCC"; // Fallback color if not provided

  return (
    <button
      onClick={() => onClick(mood)}
      className={`p-4 rounded-lg text-center transition-colors duration-200 ${
        isSelected ? "ring-2 ring-offset-2 ring-indigo-500" : ""
      }`}
      style={{ backgroundColor }}
    >
      <span className="text-3xl" role="img" aria-label={label}>
        {emoji}
      </span>
      <p className="mt-2 text-sm font-medium">{label}</p>
    </button>
  );
});

MoodButton.displayName = "MoodButton";

export default MoodButton;
