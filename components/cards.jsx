"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

/**
 *
 * @param {*} src
 * @param {Array} attributes [{key:1, value:1}]
 *
 * @returns {Node}
 */
function createScript(src, attributes = []) {
  let script = document.createElement("script");
  script.src = src;
  attributes.map((atr) => {
    script.setAttribute(atr.key, atr.value);
  });
  return script;
}

// const [chats, setChats] = useState([{ username: "", lastPostId: 1 }]);
export default function Printcards() {
  const [rendered, setRender] = useState(false);
  if (!rendered) {
    fetch("./api/chat")
      .then((response) => response.json())
      .then((chats) => {
        const main = document.querySelector("main");
        chats.map((chat) => {
          let div = document.createElement("div");
          div.setAttribute("class", "w-full my-6");

          div.appendChild(
            createScript("script/tgwidget.js", [
              {
                key: "data-telegram-post",
                value: chat.username + "/" + chat.lastPostId,
              },
              {
                key: "data-width",
                value: "100%",
              },
            ])
          );

          main.appendChild(div);
        });
      });

    setRender(true);
  }
  return "";
}
