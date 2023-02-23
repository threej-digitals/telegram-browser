import Button from "../button";
import ChatDetailsCard from "./chatDetails";
import Footer from "../footer";

export default function RightSidebar() {
  return (
    <aside className="fixed w-[16rem] h-screen top-0 right-0 cscroll hidden sm:block pr-4 py-10 overflow-y-scroll">
      <ChatDetailsCard />
      <Footer />

      {/* Feedback button */}
      <Button
        text="Feedback"
        type="alert"
        href={
          "https://tx.me/threej_in/" + process.env.NEXT_PUBLIC_DEFAULTPOSTID
        }
        classNames="fixed bottom-0 right-7 w-[14rem] rounded-t-lg rounded-b-none"
      />
    </aside>
  );
}
