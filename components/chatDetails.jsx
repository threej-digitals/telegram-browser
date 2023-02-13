import Button from "./button";

export default function ChatDetailsCard() {
  return (
    <div
      className="flex flex-col dark:text-white gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
      id="chatDetailsCard"
    >
      <div className="info flex flex-row">
        <img src="favicon.png" alt="" className="rounded-full w-16" />
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
      <Button text="SUBSCRIBE" style={{ width: "100%" }} />
    </div>
  );
}
