import Printcards from "../components/cards";

export default async function Home() {
  // let darkTheme = {};
  // if (Cookies.get("darkMode") == "on") {
  //   darkTheme = {
  //     "data-color": "343638",
  //     "data-dark": "1",
  //     "data-dark-color": "FFFFFF",
  //   };
  // }

  // console.log(chats);
  return (
    <>
      <main className="w-full mt-20 sm:mt-8 px-4">
        <Printcards />
      </main>
    </>
  );
}
