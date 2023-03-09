import { ChatContext } from "@/context/ChatContextProvider";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Button from "./button";
import NewCustomFeed from "./sidebar/newCustomFeed";

export default function HomeFeed() {
  const [didScroll, setDidScroll] = useState(false);
  const chatContext = useContext(ChatContext);
  const { darkMode, cookies, location } = useContext(GlobalContext);

  useEffect(() => {
    document.querySelector("div#feed").innerHTML = "";
    if (location.href.includes("/feed/")) {
      const q = new URLSearchParams(window.location.search);
      chatContext.fetchCustomFeed(q.get("id"));
    } else {
      chatContext.fetchChats(cookies.chatCategory, cookies.chatLanguage);
    }
    window.addEventListener("scroll", () => {
      setDidScroll(true);
    });
  }, []);

  //handle scroll effects
  setTimeout(() => {
    if (didScroll) {
      setDidScroll(false);

      //update chat details card
      document.querySelectorAll("div#feed div").forEach((div) => {
        if (
          div.getBoundingClientRect().top > -100 &&
          div.getBoundingClientRect().top < 250
        ) {
          const username = div.getAttribute("data-username") || "";
          if (chatContext.currentChat.username != username) {
            chatContext.chats.map((chat) => {
              if (username == chat.username) chatContext.setCurrentChat(chat);
            });
          }
        }
      });

      //load more posts
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >
        document.documentElement.scrollHeight
      ) {
        chatContext.modifyChatsState();
        //remove redundant div from feed
        document
          .querySelectorAll("div#feed div script:only-child")
          .forEach((el) => el.parentNode.remove());
      }
    }
  }, 250);

  /**
   *
   * @param {*} src
   * @param {Array} attributes [{key:1, value:1}]
   *
   * @returns {Node}
   */
  const createScript = (src, attributes = []) => {
    let script = document.createElement("script");
    script.src = src;
    attributes.map((atr) => {
      script.setAttribute(atr.key, atr.value);
    });
    return script;
  };

  const updateFeed = () => {
    const feed = document.querySelector("div#feed");
    if (feed) {
      const cardAttrib = [
        {
          key: "data-width",
          value: "100%",
        },
      ];
      //render dark cards if darkmode is on
      if (darkMode == "on") {
        cardAttrib.push(
          {
            key: "data-color",
            value: "343638",
          },
          {
            key: "data-dark",
            value: "1",
          },
          {
            key: "data-dark-color",
            value: "FFFFFF",
          }
        );
      }

      chatContext.chats.map((chat) => {
        if (chatContext.exclusionList.includes(chat.username)) return;
        let div = document.createElement("div");
        div.setAttribute("class", "w-full my-6");
        div.setAttribute("data-username", chat.username);
        div.appendChild(
          createScript(location.base + "/script/tgwidget.js", [
            {
              key: "data-telegram-post",
              value: chat.username + "/" + chat.lastPostId,
            },
            ...cardAttrib,
          ])
        );
        feed.appendChild(div);
      });
    }
  };

  if (typeof document == "object") updateFeed();

  return (
    <>
      <main className="relative sm:left-60 min-h-screen sm:flex sm:col-span-2 w-full mt-20 sm:mt-4 px-4">
        <div className="w-[95%] sm:w-full flex flex-col">
          <div id="feed">.</div>
          <Button
            onClick={() => {
              chatContext.modifyChatsState();
            }}
            text="Load more post"
            id="loadMorePost"
          />
        </div>
        <NewCustomFeed />
      </main>
    </>
  );
}
