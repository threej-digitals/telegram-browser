export default function Footer() {
  return (
    <footer
      className=" text-gray-400 mt-2 w-full text-center"
      style={{ fontSize: "13px" }}
    >
      <p>
        <a href="https://threej.in/about">About</a> ·{" "}
        <a href="https://threej.in/advertise">Ads</a> ·{" "}
        <a href="https://github.com/threej-digitals/telegram-browser">
          Contribute
        </a>{" "}
        · <a href="https://t.me/threej_discuss">Support</a>
      </p>
      <br />
      <p>
        &copy; {new Date().getFullYear()} <a href="https://threej.in">ThreeJ</a>
      </p>
    </footer>
  );
}
