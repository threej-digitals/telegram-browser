import ChatDetailsCard from "@/components/chatDetails";
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import Printcards from "../components/cards";
import Sidebar from "./sidebar";

export default async function Home() {
  return (
    <>
      <Sidebar darkMode={cookies().get("darkMode").value || ""} />
      <main className="sm:flex w-full mt-20 sm:mt-4 px-4">
        <div id="feed" className="w-full sm:w-[60%]">
          <Printcards />
        </div>
        <div className="hidden sm:block w-[35%] h-fit sticky top-4 m-5">
          <ChatDetailsCard />
          <Footer />
        </div>
      </main>
    </>
  );
}
