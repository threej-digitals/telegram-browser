import { ChatContext } from "@/context/ChatContextProvider";
import { GlobalContext } from "@/context/GlobalContext";
import Script from "next/script";
import { useContext } from "react";
import Button from "../button";

export default function NewCustomFeed() {
  const { cookies } = useContext(GlobalContext);
  const { updateUserFeed } = useContext(ChatContext);

  async function createNewFeed(title, chats) {
    if (!cookies.telegramUser) {
      return alert("Please login before creating a custom feed");
    }

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      telegramUser: cookies.telegramUser,
      name: title,
      description: "",
      chats: chats.split(","),
    });

    let response = await fetch("api/feed", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let result = await response.json();
    alert(result.message);
    document.querySelector("div#newCustomFeed").classList.add("hidden");
    updateUserFeed();
  }

  return (
    <div
      id="newCustomFeed"
      className="fixed top-0 bg-gray-500 bg-opacity-50 left-0 z-[1000] w-full h-screen hidden"
    >
      <div className="flex flex-col gap-4 p-10 fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-fit shadow-xl bg-slate-200 dark:shadow-gray-700 dark:bg-gray-800 rounded-lg text-gray-300">
        <span
          className="cursor-pointer absolute top-0 right-0 m-2"
          onClick={(e) => {
            e.target.parentElement.parentElement.classList.add("hidden");
          }}
        >
          ✖️
        </span>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            createNewFeed(e.target.title.value, e.target.chats.value);
            return false;
          }}
        >
          <label htmlFor="title" className="text-xs text-gray-400">
            Feed name
          </label>
          <input
            type="text"
            name="title"
            className="px-1 text-black dark:text-white dark:bg-gray-600 outline-none"
          />
          <textarea
            type="text"
            name="chats"
            className="px-1 text-black dark:text-white dark:bg-gray-600 outline-none w-full text-sm"
            placeholder="Enter comma separated public channel usernames without @"
            rows={4}
          />
          <Button text="Create Feed" classNames="w-full" onClick={() => {}} />
        </form>

        <Script>
          {`function onTelegramAuth(user) {
            document.cookie = "telegramUser=" + user.id;
          }`}
        </Script>
        <div className="loginPrompt"></div>
      </div>
    </div>
  );
}
