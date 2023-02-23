export default function Button({
  classNames = "",
  href = "",
  id,
  style = {},
  text,
  type = "default",
  onClick,
}) {
  let css = " from-cyan-500 to-blue-500";

  if (type == "success") {
    css = " from-green-400 via-green-500 to-green-600";
  }

  if (type == "danger") {
    css = " from-red-400 via-red-500 to-red-600";
  }

  if (type == "alert") {
    css = " from-orange-400 via-orange-500 to-orange-600";
  }

  const handleOnclick = (href = "") => {
    if (href !== "") {
      return window.open(href, "_blank");
    } else {
      onClick();
    }
    return false;
  };

  return (
    <button
      onClick={() => {
        handleOnclick(href);
      }}
      style={style}
      id={id}
      className={
        classNames +
        css +
        " self-center text-white bg-gradient-to-r hover:bg-gradient-to-bl focus:outline-none font-medium rounded text-sm px-5 py-1.5 text-center"
      }
    >
      {text}
    </button>
  );
}
