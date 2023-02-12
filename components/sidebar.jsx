"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import chatCategories from "../json/categories.json";
import chatLangauges from "../json/languages.json";

export default function Sidebar(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode);

  function CategoryDropdown() {
    return (
      <select
        className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
        id="categoriesDropdown"
      >
        <option value="category">🧩 Category</option>
        {chatCategories.map((cat, i) => {
          return (
            <option value={i} key={cat.split(" ")[1]}>
              {cat}
            </option>
          );
        })}
      </select>
    );
  }

  function ChatList() {
    return (
      <div className="dark:text-white bg-gray-200 dark:bg-gray-900 rounded p-2">
        <p className=" text-gray-400" style={{ fontSize: "13px" }}>
          chat list
        </p>
        <div className=" max-h-48 overflow-y-scroll">
          <ul id="chatList"></ul>
        </div>
      </div>
    );
  }

  function DarkModeSection() {
    return (
      <div className="sticky bottom-0 mt-10 bg-gray-100 dark:bg-gray-700 px-3 pt-3 pb-1 w-full">
        <label className="relative inline-flex cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={toggleDarkMode}
            checked={darkMode == "on" ? true : false}
            readOnly
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Dark mode
          </span>
        </label>
      </div>
    );
  }

  function LanguageDropdown() {
    return (
      <select
        className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
        id="languageDropdown"
      >
        <option value="">🌎 Language</option>
        {chatLangauges.map((lang) => {
          return (
            <option value={lang[0]} key={lang[0]}>
              {lang[1]}
            </option>
          );
        })}
      </select>
    );
  }

  function MobileHeader() {
    return (
      <div className="fixed top-0 items-center justify-between w-full flex flex-column z-50 sm:hidden py-2 px-4 bg-gray-300 dark:bg-gray-700">
        <Image
          className="rounded"
          src={"/favicon.png"}
          width={45}
          height={45}
          alt="Telegram browser logo"
        ></Image>
        <span className="dark:text-white font-bold text-xl">
          Telegram Browser
        </span>
        <button
          className="dark:text-white w-7 h-7 p-1 bg-slate-400 dark:bg-gray-800 rounded-sm"
          onClick={() => {
            let aside = document.querySelector("aside");
            aside.classList.contains("hidden")
              ? aside.classList.remove("hidden")
              : aside.classList.add("hidden");
          }}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO2YwUkEQRBFH+LBgxEIXoxAw/AgRqIBTDeMixHowembKQiCYWgEXgQD0O1ZVkRKVpa9OMKOTnf1SD2o8/ziF49mwDAMozik4Vwa3iQgRUzzlWXSZ4FX9dDh27ysv0BgIoF5AaFlOXNpOOt9StFz2XpEc6LnonfwVRM1G9Fzo7aA405qNn+9wHKJ7dbzoBD+fvFthqCt2Ymep2xn43ieOXYZkug5iI5phvDTWLE/aPjVEhWH0fGeMPxHW3FMStqK04R3f0IOUug1/kWX6np1A+hSTa9uQF3m1mtMoctcek2qy9R6zaLLpHrNpcu+rPs8plTEFlDGGtDGGtDGGtDGGtDGGtDGGhhBA48SOKJU5Ofgs8Xvcblmi5KR7vC3csUeY0DGdC5djOpcuhjVuRjGP+ET+40TJj+/lmAAAAAASUVORK5CYII=" />
        </button>
      </div>
    );
  }

  const toggleDarkMode = () => {
    console.log(darkMode);
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
    <>
      <MobileHeader />
      <aside
        className="fixed sm:sticky bottom-0 top-0 left-0 w-full md:w-1/4 flex hidden sm:flex flex-col justify-between min-h-screen h-full bg-gray-100 dark:bg-gray-800 ease-in duration-500"
        aria-label="Sidebar"
      >
        <div className="px-3 pt-8 sm:pt-2 overflow-y-auto">
          <ul className="space-y-2 hidden md:block">
            <li>
              <span className="flex text-base font-serif font-semibold text-gray-900 transition duration-75 rounded-lg dark:text-white group">
                <Image
                  className="hidden rounded-md ml-3"
                  src={"/favicon.png"}
                  width={60}
                  height={60}
                  alt="Telegram browser logo"
                ></Image>
                <h1 className="ml-2 mt-2">Telegram Browser</h1>
              </span>
            </li>
          </ul>
          <ul className="flex flex-col gap-3 py-6 text-sm">
            <li>
              <CategoryDropdown />
            </li>
            <li>
              <LanguageDropdown />
            </li>
          </ul>
          <ul className="flex flex-col gap-3 py-6 text-sm">
            <li>
              <ChatList />
            </li>
          </ul>
        </div>

        {/* Dark mode toggle button */}
        <DarkModeSection />
      </aside>
    </>
  );
}
