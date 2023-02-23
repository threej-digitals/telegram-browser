import { GlobalContext } from "@/context/GlobalContext";
import Cookies from "js-cookie";
import { useContext } from "react";
import chatCategories from "json/categories.json";
import chatLangauges from "json/languages.json";
import Dropdown from "../dropdown";
import DarkModeToggle from "./DarkModeToggle";
import SmallDeviceHeader from "./SmallDeviceHeader";
import { ChatContext } from "@/context/ChatContextProvider";
import ChatList from "./chatList";

export default function LeftSidebar() {
  const { cookies } = useContext(GlobalContext);
  const chatContext = useContext(ChatContext);
  var chatCategory = cookies.chatCategory || 27;
  var chatLanguage = cookies.chatLanguage || "en";

  const updateFeed = () => {
    window.scrollTo(0, 0);
    document.querySelector("div#feed").innerHTML = "";
    document.querySelector("div#chatDetailsCard h3").innerText = "";
    Cookies.set("chatCategory", chatCategory);
    Cookies.set("chatLanguage", chatLanguage);
    chatContext.fetchChats(chatCategory, chatLanguage);
  };

  return (
    <>
      <SmallDeviceHeader />
      <aside
        className="fixed bottom-0 top-0 left-0 w-full sm:w-[14rem] flex hidden sm:flex flex-col justify-between min-h-screen h-full bg-gray-100 dark:bg-gray-800 ease-in duration-500"
        aria-label="Sidebar"
      >
        <div className="px-3 pt-8 sm:pt-2 overflow-y-auto">
          <ul className="space-y-2 hidden md:block">
            <li>
              <span className="flex text-base font-serif font-semibold text-gray-900 transition duration-75 rounded-lg dark:text-white group">
                <h1 className="ml-2 mt-2">Telegram Browser</h1>
              </span>
            </li>
          </ul>

          {/* dropdowns */}
          <ul className="flex flex-col gap-3 py-6 text-sm">
            {/* category dropdown */}
            <li>
              <Dropdown
                className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
                id="categoriesDropdown"
                defaultValue={cookies.chatCategory}
                onChange={(e) => {
                  chatCategory = e.target.value;
                  updateFeed();
                }}
                options={chatCategories}
              />
            </li>

            {/* language dropdown */}
            <li>
              <Dropdown
                className="w-full bg-transparent dark:bg-gray-800 dark:text-white py-2 cursor-pointer border-b border-gray-500 focus:outline-none"
                id="languageDropdown"
                defaultValue={cookies.chatLanguage}
                onChange={(e) => {
                  chatLanguage = e.target.value;
                  updateFeed();
                }}
                options={chatLangauges}
              />
            </li>
          </ul>

          <ul className="flex flex-col gap-3 py-6 text-sm">
            <li>
              {/* chatlist section */}
              <ChatList />
            </li>
          </ul>
        </div>

        <DarkModeToggle />
      </aside>
    </>
  );
}
