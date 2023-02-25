import ChatDetailsCard from "./chatDetails";
import Footer from "../footer";
import SocialShareBtn from "./socialShareBtn";
import ShareSvg from "@/svg/shareSvg";
import FeedbackSvg from "@/svg/feedbackSvg";
import BookmarkSvg from "@/svg/bookmarkSvg";
import CopySvg from "@/svg/copySvg";

export default function RightSidebar() {
  return (
    <>
      <button
        onClick={() => {
          document.getElementById("rightSidebar").classList.remove("hidden");
        }}
        className="-rotate-90 fixed lg:hidden right-[-60px] cursor-pointer hover:shadow-lg bottom-14 rounded bg-gray-800 text-sm py-1 px-4 text-white "
      >
        CHAT DETAILS
      </button>

      <aside
        id="rightSidebar"
        className="z-[100] w-full shadow-2xl lg:shadow-none shadow-slate-500 bg-slate-300 dark:bg-gray-900 fixed sm:w-[16rem] h-screen top-0 right-0 cscroll hidden lg:block px-3 py-10 overflow-y-scroll"
      >
        {/* close button for small device */}
        <span
          className="lg:hidden cursor-pointer absolute top-0 left-2 my-2"
          onClick={(e) => {
            e.target.parentElement.classList.add("hidden");
          }}
        >
          ▶️
        </span>

        <ChatDetailsCard />
        <Footer />

        <div className="relative flex justify-around mt-7">
          {/* Social share button */}
          <div>
            <span title="share" className="peer">
              <ShareSvg
                classNames="bg-sky-400 rounded-full p-1 cursor-pointer"
                height={40}
                width={40}
                fill="yellow"
              />
            </span>
            <div className="absolute left-2 -top-11 peer-focus:visible peer-hover:visible hover:visible invisible flex gap-2 p-2 pb-1 rounded bg-slate-200 dark:bg-slate-800">
              <SocialShareBtn
                title="Browse public telegram channels as feed based on your prefernece without login."
                url="https://threej.in/telegram-browser"
                classNames="hover:shadow-md rounded-full p-0"
                hashtags={["telegram", "telegramChannel"]}
                image="/favicon.png"
                networks={[
                  "telegram",
                  "whatsapp",
                  "facebook",
                  "twitter",
                  "pinterest",
                ]}
              />
              <span
                onClick={() => {
                  navigator.clipboard.writeText(location.href).then(
                    function () {
                      alert("Link copied to clipboard!");
                    },
                    function () {
                      console.log("Copy error");
                    }
                  );
                }}
                className="cursor-pointer"
              >
                <CopySvg width={30} height={30} />
              </span>
            </div>
          </div>

          {/* feedback btn */}
          <div
            onClick={() => {
              window.open(
                "https://tx.me/threej_in/" +
                  process.env.NEXT_PUBLIC_DEFAULTPOSTID,
                "_blank"
              );
            }}
            title="feedback"
          >
            <FeedbackSvg
              width={40}
              height={40}
              classNames="bg-sky-400 rounded-full p-0 cursor-pointer"
            />
          </div>

          {/* bookmark btn */}
          <div
            title="bookmark"
            onClick={() => {
              alert("Press ctrl + D to bookmark this page");
            }}
          >
            <BookmarkSvg
              fill="#dbf5ff"
              width={40}
              height={40}
              classNames="bg-sky-400 rounded-full p-1 cursor-pointer"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
