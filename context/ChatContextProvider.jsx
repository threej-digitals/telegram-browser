import { createContext, useState } from "react";

export const ChatContext = createContext({});

const chatStruct = {
  username: "threej_in",
  lastPostId: process.env.NEXT_PUBLIC_DEFAULTPOSTID,
  title: "3J | ThreeJ",
  description: `Digital service provider

  Support chat @threej_discuss
  
  Portfolio : bento.me/jitendra`,
  subscribers: "80",
  links: "",
  videos: "",
  photo: "template/primary/img/threej-com.webp",
  images: "",
  id: "",
  files: "",
};

export default function ChatContextProvider({ children, cookies }) {
  var chatLimit = cookies.chatLimit || 20;
  const promotedChats = [chatStruct];
  const promotedChatsList = ["threej_in"];

  const [exclusionList, updateExclusionList] = useState(
    JSON.parse(cookies.exclusionList || "[]")
  );

  const [chats, updateChats] = useState([chatStruct]);

  const [currentChat, setCurrentChat] = useState({
    photo: "favicon.png",
    title: "",
    username: "",
    description: "",
    subscribers: 0,
    videos: 0,
    images: 0,
    links: 0,
  });

  function fetchChats(category, language, limit = chatLimit) {
    fetch(
      "api/chat?category=" +
        category +
        "&language=" +
        language +
        "&limit=" +
        limit
    )
      .then((response) => response.json())
      .then(async (newChatList) => {
        setCurrentChat(newChatList[0] || currentChat);
        newChatList = [...promotedChats, ...newChatList];
        updateChats(newChatList);
        chatLimit = newChatList.length;
      });
  }

  function modifyChatsState() {
    let tchats = chats;
    tchats = tchats.filter(
      (chat) => !promotedChatsList.includes(chat.username)
    );

    tchats.map((chat) => chat.lastPostId--);
    updateChats(tchats);
  }

  return (
    <ChatContext.Provider
      value={{
        fetchChats,
        chats,
        updateChats,
        currentChat,
        setCurrentChat,
        promotedChats,
        promotedChatsList,
        modifyChatsState,
        exclusionList,
        updateExclusionList,
        chatLimit,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
