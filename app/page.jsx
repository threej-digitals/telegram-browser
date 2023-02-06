import Printcards from "../components/cards";

export default async function Home() {
  return (
    <>
      <main className="sm:flex w-full mt-20 sm:mt-4 px-4">
        <div id="feed" className="w-full sm:w-[60%]">
          <Printcards />
        </div>
        <div className="hidden sm:block w-[35%] h-fit sticky top-4 m-5">
          <div
            className="flex flex-col dark:text-white gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
            id="chatDetailsCard"
          >
            <div className="info flex flex-row">
              <other data="favicon.png" className="rounded-full w-1/3">
                <img src="favicon.png" alt="" className="rounded-full w-16" />
              </other>
              <div className="flex flex-col justify-center text-left ml-2 w-2/3 overflow-auto whitespace-nowrap">
                <h3></h3>
                <h5 className="text-xs text-sky-500"></h5>
              </div>
            </div>
            <div className="counters flex gap-3 overflow-auto">
              {["subscribers", "images", "videos", "links"].map((el) => (
                <div key={el} className={el + " gap-0"}>
                  <p></p>
                  <span className="text-gray-500 text-xs">{el}</span>
                </div>
              ))}
            </div>
            <div className="description text-sm break-words max-h-52 overflow-y-scroll"></div>
            <button className="rounded px-10 py-1 bg-sky-500 text-white text-sm hover:bg-sky-400">
              SUBSCRIBE
            </button>
          </div>
          <footer
            className="font-thin text-gray-400 mt-2 w-full text-center"
            style={{ fontSize: "13px" }}
          >
            <p>About · Help · Ads · Support · Contribute on Github</p>
            <br />
            <p>&copy; {new Date().getFullYear()} ThreeJ</p>
          </footer>
        </div>
      </main>
    </>
  );
}
