import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  return <div>ThemeToggle</div>;
};

export default ThemeToggle;
