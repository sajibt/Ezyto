import React, { createContext, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useLocalStorage("light");

  const mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
