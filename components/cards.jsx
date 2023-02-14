"use client";
import { nformatter } from "@/scripts/helper";
import Cookies from "js-cookie";
import React from "react";

class Printcards extends React.Component {
  scrollPos = 0;
  chatCategory = Cookies.get("chatCategory") || 27;
  chatLanguage = Cookies.get("chatLanguage") || "en";
  chatLimit = 20;

  promotedChats = [];

  promotedChatsList = [];

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      darkMode: Cookies.get("darkMode") || "on",
      currentChat: "",
    };
  }

  componentDidMount() {
    this.fetchChats();
    window.addEventListener("scroll", this.handleScrollEffects);

    const categories = document.getElementById("categoriesDropdown");
    categories.value = this.chatCategory;
    categories.addEventListener("change", () => {
      document.querySelector("div#feed").innerHTML = "";
      document.querySelector("div#chatDetailsCard h3").innerText = "";
      this.chatCategory = categories.value;
      Cookies.set("chatCategory", categories.value);
      this.fetchChats(categories.value);
    });

    const language = document.getElementById("languageDropdown");
    language.value = this.chatLanguage;
    language.addEventListener("change", () => {
      document.querySelector("div#feed").innerHTML = "";
      document.querySelector("div#chatDetailsCard h3").innerText = "";
      this.chatLanguage = language.value;
      Cookies.set("chatLanguage", language.value);
      this.fetchChats(this.chatCategory, language.value);
    });

    document
      .querySelector("button#loadMorePost")
      ?.addEventListener("click", this.modifyChatsState);
  }

  /**
   *
   * @param {*} src
   * @param {Array} attributes [{key:1, value:1}]
   *
   * @returns {Node}
   */
  createScript(src, attributes = []) {
    let script = document.createElement("script");
    script.src = src;
    attributes.map((atr) => {
      script.setAttribute(atr.key, atr.value);
    });
    return script;
  }

  fetchChats(
    category = this.chatCategory,
    language = this.chatLanguage,
    limit = this.chatLimit
  ) {
    fetch(
      "api/chat?category=" +
        category +
        "&language=" +
        language +
        "&limit=" +
        limit
    )
      .then((response) => response.json())
      .then((chats) => {
        chats = [...this.promotedChats, ...chats];
        this.setState({ chats: chats });
        this.chatLimit = chats.length;
        this.updateChatList(chats);
      });
  }

  handleScrollEffects = () => {
    let main = document.querySelector("main").getBoundingClientRect();
    if (Math.abs(main.top - this.scrollPos) > 200) {
      //remove redundant div from feed
      document
        .querySelectorAll("div#feed div script:only-child")
        .forEach((el) => el.parentNode.remove());

      //update chat details card
      document.querySelectorAll("div#feed div").forEach((div) => {
        if (
          div.getBoundingClientRect().top > -100 &&
          div.getBoundingClientRect().top < 250
        ) {
          const username = div.getAttribute("data-username") || "";
          if (this.state.currentChat != username) {
            this.setState({ currentChat: username });

            this.state.chats.map((chat) => {
              if (username == chat.username) this.setChatDetails(chat);
            });
          }
        }
      });

      //load more posts
      const lastPost = document.querySelector("div#feed div:last-child");
      if (lastPost) {
        const lastPostPos = lastPost.getBoundingClientRect();
        if (lastPostPos.top < 1000) {
          this.modifyChatsState();
        }
      }

      this.scrollPos = main.top;
    }
  };

  modifyChatsState = () => {
    let chats = this.state.chats;
    chats = chats.filter(
      (chat) => !this.promotedChatsList.includes(chat.username)
    );
    chats.map((chat) => chat.lastPostId--);
    this.setState({ chats: chats });
  };

  setChatDetails = (chat) => {
    const el = document.querySelector("div#chatDetailsCard");
    el.querySelector("img").setAttribute(
      "src",
      "https://threej.in/" + chat.photo
    );
    el.querySelector("h3").innerText = chat.title;
    el.querySelector(
      "h5"
    ).innerHTML = `<a target="_blank" href="https://telegram.me/${chat.username}">@${chat.username}</a>`;
    el.querySelector("div.description").innerHTML = chat.description || "";
    ["subscribers", "images", "videos", "links"].map((counter) => {
      el.querySelector("div.counters div." + counter + " p").innerText =
        nformatter(chat[counter]) || "";
    });

    el.querySelector("button").setAttribute(
      "onclick",
      `window.open('https://telegram.me/${chat.username}','_blank')`
    );
  };

  updateChatList = (chats) => {
    const chatListCard = document.getElementById("chatList");
    if (chatListCard) {
      let chatList = "";
      chats.map(
        (chat) => (chatList += chat.title ? `<li>${chat.title}</li>` : "")
      );
      chatListCard.querySelector("ul").innerHTML = chatList;

      const CategoryDropdown = document.querySelector(
        "select#categoriesDropdown"
      );
      chatListCard.querySelector("p").innerText = `showing top ${
        this.chatLimit
      } ${
        CategoryDropdown.options[CategoryDropdown.options.selectedIndex].text
      } channels`;
    }
  };

  updateFeed = (chats) => {
    const feed = document.querySelector("div#feed");
    if (feed) {
      const cardAttrib = [
        {
          key: "data-width",
          value: "100%",
        },
      ];
      //render dark cards if darkmode is on
      if (this.state.darkMode == "on") {
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

      chats.map((chat) => {
        //set chat details card
        if (
          document.querySelector("div#chatDetailsCard h3").textContent == ""
        ) {
          this.setChatDetails(chat);
        }

        let div = document.createElement("div");
        div.setAttribute("class", "w-full my-6");
        div.setAttribute("data-username", chat.username);
        div.appendChild(
          this.createScript("script/tgwidget.js", [
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

  render = () => {
    if (typeof document !== "undefined") {
      this.updateFeed(this.state.chats);
    }
    return <></>;
  };
}

export default Printcards;
