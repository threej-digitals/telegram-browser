import { ChatContext } from "@/context/ChatContextProvider";
import Cookies from "js-cookie";
import { useContext } from "react";

export default function ChatList() {
  const chatContext = useContext(ChatContext);

  function toggleChatList(username, checked) {
    let exList = [...chatContext.exclusionList];
    if (checked) {
      exList = exList.filter((e) => e != username);
      document
        .querySelectorAll("div[data-username=" + username + "]")
        .forEach((div) => div.classList.remove("hidden"));
    } else {
      //add chat to exclusion list and also remove the printed chats
      exList.push(username);
      document
        .querySelectorAll("div[data-username=" + username + "]")
        .forEach((div) => div.classList.add("hidden"));
    }
    Cookies.set("exclusionList", JSON.stringify(exList));
    chatContext.updateExclusionList(exList);
  }

  return (
    <div
      id="chatList"
      className="dark:text-white bg-gray-200 dark:bg-gray-900 rounded p-2"
    >
      <p
        className="flex justify-between text-gray-400"
        style={{ fontSize: "13px" }}
      >
        <span>Chats</span>
        <span>Show/Hide</span>
      </p>
      <div className=" max-h-48 overflow-y-scroll">
        <ul>
          {chatContext.chats.map((chat, i) => (
            <li
              className="my-2 flex justify-between w-full overflow-hidden text-xs bg-gray-300 dark:bg-gray-800 p-2"
              key={chat.username + chat.lastPostId}
            >
              <p>
                {i + 1}.{" "}
                <a
                  href={
                    "/tg?tgcontentid=" + chat.id + "&username=" + chat.username
                  }
                >
                  {chat.title}
                </a>
              </p>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onClick={(e) => {
                    e.target.checked = e.target.checked ? true : false;
                    toggleChatList(chat.username, e.target.checked);
                  }}
                  defaultChecked={
                    chatContext.exclusionList.includes(chat.username)
                      ? false
                      : true
                  }
                />
                <div className="w-6 h-3 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
