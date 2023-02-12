export default function Button({ text, type = "default", style = {}, id }) {
  let css = "from-cyan-500 to-blue-500";

  if (type == "success") {
    css = "from-green-400 via-green-500 to-green-600";
  }

  if (type == "danger") {
    css = "from-red-400 via-red-500 to-red-600";
  }

  return (
    <button
      style={style}
      id={id}
      className={
        css +
        " self-center text-white bg-gradient-to-r hover:bg-gradient-to-bl focus:outline-none font-medium rounded text-sm px-5 py-1.5 text-center"
      }
    >
      {text}
    </button>
  );
}
