import { ChatContext } from "@/context/ChatContextProvider";
import Cookies from "js-cookie";
import { useContext } from "react";

export default function CustomFeed() {
  const chatContext = useContext(ChatContext);

  return (
    <div
      id="customFeed"
      className="dark:text-white bg-gray-200 dark:bg-gray-900 rounded p-2"
    >
      <p
        className="flex justify-between text-gray-400"
        style={{ fontSize: "13px" }}
      >
        <span>Custom Feed</span>
        <span>➕</span>
      </p>
      <div className=" max-h-48 overflow-y-scroll"></div>
    </div>
  );
}
