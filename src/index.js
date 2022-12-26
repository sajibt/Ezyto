import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import NotesConextProvider from "./Context/NotesConext";
import { ThemeProvider } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesConextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NotesConextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
