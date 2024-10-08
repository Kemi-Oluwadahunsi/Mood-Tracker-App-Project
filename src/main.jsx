import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { MoodProvider } from "./contexts/MoodContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MoodProvider>
        <App />
      </MoodProvider>
    </ThemeProvider>
  </StrictMode>
);
