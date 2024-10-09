// import React from "react";

// function ActivityButton({ activity, Icon, isSelected, onToggle }) {
//   return (
//     <button
//       onClick={() => onToggle(activity)}
//       className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
//         isSelected
//           ? "bg-indigo-600 text-white"
//           : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
//       }`}
//     >
//       {Icon && <Icon className="mr-2 h-4 w-4" />}
//       {activity}
//     </button>
//   );
// }

// export default React.memo(ActivityButton);


import React from "react";

function ActivityButton({ activity, Icon, isSelected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(activity)}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isSelected
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {activity}
    </button>
  );
}

export default React.memo(ActivityButton);
