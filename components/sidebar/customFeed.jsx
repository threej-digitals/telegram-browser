import { GlobalContext } from "@/context/GlobalContext";
import CopySvg from "@/svg/copySvg";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";

export default function CustomFeed() {
  const { cookies, location } = useContext(GlobalContext);
  const [userFeeds, setUserFeed] = useState([]);

  useEffect(() => {
    getUserFeeds();

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.setAttribute("async", "true");
    script.setAttribute("data-telegram-login", "threej_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.querySelector("div#telegramLogin").appendChild(script);
  }, []);

  //get users custom feed if already logged in
  async function getUserFeeds() {
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
    <>
      <div
        id="customFeed"
        className="dark:text-white bg-gray-200 dark:bg-gray-900 rounded p-2"
      >
        <p
          className="flex justify-between text-gray-400"
          style={{ fontSize: "13px" }}
        >
          <span>Custom Feed</span>
          {/* show new feed popup */}
          <span
            className=" cursor-pointer"
            onClick={() => {
              document
                .querySelector("div#newCustomFeed")
                .classList.remove("hidden");
            }}
          >
            ➕
          </span>
        </p>
        <div className=" max-h-48 overflow-y-scroll">
          <ul>
            {userFeeds.map((feed) => (
              <li
                className="my-2 flex justify-between w-full overflow-hidden text-xs bg-gray-300 dark:bg-gray-800 p-2"
                key={feed.FEEDID}
              >
                <a
                  href={
                    location.base +
                    "/feed?name=" +
                    feed.NAME +
                    "&id=" +
                    feed.FEEDID
                  }
                >
                  {feed.NAME}-{feed.FEEDID}
                </a>
                {
                  <span
                    onClick={() => {
                      navigator.clipboard
                        .writeText(
                          location.host +
                            location.base +
                            "/feed?name=" +
                            feed.NAME +
                            "&id=" +
                            feed.FEEDID
                        )
                        .then(function () {
                          alert("Link copied to clipboard!");
                        });
                    }}
                    className="cursor-pointer"
                  >
                    <CopySvg width={25} height={25} />
                  </span>
                }
              </li>
            ))}
          </ul>

          {/* telegram login widget */}
          <div
            id="telegramLogin"
            className={cookies.telegramUser ? "hidden" : ""}
          >
            <p className="text-xs text-gray-500">
              Login to view your custom feed
            </p>
            <Script>
              {`function onTelegramAuth(user) {
                document.cookie = "telegramUser="+user.id;
              }`}
            </Script>
          </div>
        </div>
      </div>
    </>
  );
}
