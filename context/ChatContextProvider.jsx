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

export default function ChatContextProvider({ children, cookies, location }) {
  var chatLimit = cookies.chatLimit || 20;
  const promotedChats = [chatStruct];
  const promotedChatsList = ["threej_in"];

  const [exclusionList, updateExclusionList] = useState(
    JSON.parse(cookies.exclusionList || "[]")
  );

  const [chats, updateChats] = useState([chatStruct]);
  const [userFeeds, setUserFeed] = useState([]);

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

  const callFetch = (method, url, headers, body) => {
    return new Promise((resolve, reject) => {
      let options = {
        headers: headers,
        method: method,
      };

      if (method === "POST") {
        options["body"] = JSON.stringify(body);
      }
      fetch(url, options)
        .then((response) => response.json())
        .then(async (newChatList) => {
          setCurrentChat(newChatList[0] || currentChat);
          newChatList = [...promotedChats, ...newChatList];
          updateChats(newChatList);
          chatLimit = newChatList.length;

          resolve(newChatList);
        });
    });
  };

  function fetchChats(category = 27, language = "en", limit = chatLimit) {
    callFetch(
      "GET",
      location.base +
        "/api/chat?category=" +
        category +
        "&language=" +
        language +
        "&limit=" +
        limit
    );
  }

  function fetchCustomFeed(feedId) {
    fetch(location.base + "/api/feed?id=" + feedId)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.ok) {
          let chats = result.feeds[0].CHATS;

          callFetch(
            "POST",
            location.base + "/api/chat",
            {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            chats
          ).then((newChatList) => {
            if (newChatList.length != chats.length) {
              callFetch(
                "POST",
                location.base + "/api/chat",
                {
                  "Content-Type": "application/json",
                  Accept: "*/*",
                },
                chats
              );
            }
          });
        } else {
          alert(result.message);
        }
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

  //get users custom feed if already logged in
  async function updateUserFeed() {
    if (cookies.telegramUser) {
      let response = await fetch(
        location.base + "/api/feed?telegramUser=" + cookies.telegramUser,
        {
          method: "GET",
          headers: { Accept: "*/*" },
        }
      );

      let data = await response.json();
      if (data.ok) setUserFeed(data.feeds);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        fetchChats,
        fetchCustomFeed,
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
        userFeeds,
        updateUserFeed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
