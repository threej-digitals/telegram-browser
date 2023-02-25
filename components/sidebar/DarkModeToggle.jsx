import { GlobalContext } from "@/context/GlobalContext";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useContext(GlobalContext);

  useEffect(() => {
    if (darkMode == "on") document.querySelector("html").classList = "dark";
  });

  const toggleDarkMode = () => {
    if (darkMode == "on") {
      Cookies.set("darkMode", "off");
      setDarkMode("off");
      document.querySelector("html").classList.remove("dark");
    } else {
      Cookies.set("darkMode", "on");
      setDarkMode("on");
      document.querySelector("html").classList.add("dark");
    }
  };

  return (
    <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-700 px-3 pt-3 pb-1 w-full">
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onClick={toggleDarkMode}
          checked={darkMode == "on" ? true : false}
          readOnly
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Dark mode
        </span>
      </label>
    </div>
  );
}
