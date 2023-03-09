import { GlobalContext } from "@/context/GlobalContext";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import chatCategories from "json/categories.json";
import chatLangauges from "json/languages.json";
import Dropdown from "../dropdown";
import DarkModeToggle from "./DarkModeToggle";
import SmallDeviceHeader from "./SmallDeviceHeader";
import { ChatContext } from "@/context/ChatContextProvider";
import ChatList from "./chatList";
import CustomFeed from "./customFeed";

export default function LeftSidebar() {
  const { cookies, location } = useContext(GlobalContext);
  const chatContext = useContext(ChatContext);

  const [chatCategory, setChatCategory] = useState(cookies.chatCategory || 27);
  const [chatLanguage, setChatLanguage] = useState(
    cookies.chatLanguage || "en"
  );
  const [chatLimit, setChatLimit] = useState(cookies.chatLimit || 20);

  const updateFeed = () => {
    if (location.href.includes("/feed/")) return;

    window.scrollTo(0, 0);
    document.querySelector("div#feed").innerHTML = "";
    document.querySelector("div#chatDetailsCard h3").innerText = "";

    Cookies.set("chatCategory", chatCategory);
    Cookies.set("chatLanguage", chatLanguage);
    Cookies.set("chatLimit", chatLimit);

    chatContext.fetchChats(chatCategory, chatLanguage, chatLimit);

    //Hide sidebar in small device
    document.querySelector("aside").classList.add("hidden");
  };

  useEffect(updateFeed, [chatCategory, chatLanguage]);

  function Title() {
    return (
      <ul className="space-y-2 hidden sm:block">
        <li>
          <span className="flex text-base font-serif font-semibold text-gray-900 transition duration-75 rounded-lg dark:text-white group">
            <h1
              className="ml-2 mt-2 cursor-pointer"
              onClick={() => {
                window.location.href = location.base;
              }}
            >
              Telegram Browser
            </h1>
          </span>
        </li>
      </ul>
    );
  }
  function Filters() {
    if (location.href.includes("/feed/")) return "";
    return (
      <ul className="flex flex-col gap-5 mt-10 sm:mt-0 sm:gap-3 text-sm">
        <p className="pl-1 text-sm opacity-100 text-gray-500">Filters</p>
        {/* chat limit */}
        <li className="flex dark:text-white justify-between pl-1">
          <label htmlFor="">
            <span
              title="Limit the number of chats in feed"
              className=" cursor-pointer px-1 text-white bg-blue-700 text-xs rounded-full text-center"
            >
              ?
            </span>
            &nbsp;Chat Limit
          </label>
          <input
            type="number"
            className="w-14 bg-transparent border-b-2 border-gray-500 px-1 outline-none"
            defaultValue={chatLimit}
            onChange={(e) => {
              setChatLimit(e.target.value);
            }}
            id="chatLimit"
          />
        </li>

        {/* category dropdown */}
        <li>
          <Dropdown
            className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
            id="categoriesDropdown"
            defaultValue={chatCategory}
            onChange={(e) => {
              setChatCategory(e.target.value);
            }}
            options={chatCategories}
          />
        </li>

        {/* language dropdown */}
        <li>
          <Dropdown
            className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
            id="languageDropdown"
            defaultValue={chatLanguage}
            onChange={(e) => {
              setChatLanguage(e.target.value);
            }}
            options={chatLangauges}
          />
        </li>
      </ul>
    );
  }

  return (
    <>
      <SmallDeviceHeader />
      <aside
        className="z-10 fixed bottom-0 top-0 left-0 w-full sm:w-[14rem] flex hidden sm:flex flex-col justify-between min-h-screen h-full bg-gray-100 dark:bg-gray-800 ease-in duration-500"
        aria-label="Sidebar"
      >
        <div className="flex flex-col gap-5 px-3 py-8 sm:pt-2 overflow-y-auto">
          <Title />

          <Filters />

          <ul className="flex flex-col pt-3 gap-5 sm:gap-3 text-sm">
            <li>
              {/* chatlist section */}
              <ChatList />
            </li>
            <li>
              {/* customlist section */}
              {location.href.includes("/feed/") ? "" : <CustomFeed />}
            </li>
          </ul>
        </div>

        <DarkModeToggle />
      </aside>
    </>
  );
}
