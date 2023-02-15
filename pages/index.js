import ChatDetailsCard from "@/components/chatDetails";
import Footer from "@/components/footer";
import Printcards from "@/components/cards";
import Sidebar from "@/components/sidebar";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Button from "@/components/button";

const darkMode = Cookies.get("darkMode") || "on";

export default function Home() {
  useEffect(() => {
    if (darkMode == "on") document.querySelector("html").classList = "dark";
  });
  return (
    <>
      <div className="flex dark:bg-gray-900 w-full">
        <Sidebar darkMode={darkMode} />
        <main className=" min-h-screen sm:flex sm:w-[77%] w-full mt-20 sm:mt-4 px-4">
          <div className="w-full sm:w-[60%] flex flex-col">
            <div id="feed">
              <Printcards />
            </div>
            <Button text="Load more post" id="loadMorePost" />
          </div>
          <div className="hidden sm:block w-[35%] h-fit sticky top-4 m-5">
            <ChatDetailsCard />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
