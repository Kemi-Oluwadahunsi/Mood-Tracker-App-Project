import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Calendar, BarChart2, Settings } from "lucide-react";

function Header({ activeTab, setActiveTab }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-indigo-600 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
          Mood Tracker
        </h1>
        <nav className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab("today")}
            className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === "today"
                ? "bg-indigo-700 dark:bg-gray-700"
                : "hover:bg-indigo-500 dark:hover:bg-gray-700"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center items-center ${
              activeTab === "calendar"
                ? "bg-indigo-700 dark:bg-gray-700"
                : "hover:bg-indigo-500 dark:hover:bg-gray-700"
            }`}
          >
            <Calendar size={20} className="inline-block mr-1" />
            <span className="hidden lg:inline ">Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={`text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center items-center ${
              activeTab === "statistics"
                ? "bg-indigo-700 dark:bg-gray-700"
                : "hover:bg-indigo-500 dark:hover:bg-gray-700"
            }`}
          >
            <BarChart2 size={20} className="inline-block mr-1" />
            <span className="hidden lg:inline ">Statistics</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center items-center ${
              activeTab === "settings"
                ? "bg-indigo-700 dark:bg-gray-700"
                : "hover:bg-indigo-500 dark:hover:bg-gray-700"
            }`}
          >
            <Settings size={20} className="inline-block mr-1" />
            <span className="hidden lg:inline ">Settings</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;