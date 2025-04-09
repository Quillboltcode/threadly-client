import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => 
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  
    useEffect(() => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [isDark]);
  
    return (
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition duration-300 flex justify-end items-center"
      >
        {isDark ? "🌙" : "☀️"}
      </button>
    );
  };
  
export default ThemeToggle;
  