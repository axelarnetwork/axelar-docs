import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  console.log("theme", theme);

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      id="header-toggle"
      className="border overflow-hidden  border-border  rounded-full w-12 h-7"
    >
      <div className="size-[25.5px] dark:ml-[20px] flex items-center justify-center text-white ml-0 transition-all duration-300 bg-primary rounded-full">
        {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
