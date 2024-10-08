import { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingFallback from "./components/staticComponents/LaodingFallback";

const MoodSelector = lazy(() => import("./components/MoodSelector"));
const MoodCalendar = lazy(() => import("./components/MoodCalendar"));
const ActivityTracker = lazy(() => import("./components/ActivityTracker"));
const MoodSuggestions = lazy(() => import("./components/MoodSuggestions"));
const RecentEntries = lazy(() => import("./components/RecentEntries"));

function App() {
  const [activeTab, setActiveTab] = useState("today");
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-gray-600 dark:to-gray-900 transition-colors duration-200 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-colors duration-200">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="p-4 sm:p-6 lg:p-8">
              <Suspense fallback={<LoadingFallback />}>
                {activeTab === "today" && (
                  <div className="space-y-6 sm:space-y-8">
                    <MoodSelector />
                    <ActivityTracker />
                    <MoodSuggestions />
                    <RecentEntries />
                  </div>
                )}
                {activeTab === "calendar" && <MoodCalendar />}
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;

// {activeTab === "statistics" && <MoodStatistics />}

// {activeTab === "settings" && (
            //   <div className="space-y-6 sm:space-y-8">
            //     {/* <CustomMoodLabels />
            //     <Settings /> */}
            //   </div>
            // )}