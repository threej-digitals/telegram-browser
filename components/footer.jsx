export default function Footer() {
  return (
    <footer
      className="font-thin text-gray-400 mt-2 w-full text-center"
      style={{ fontSize: "13px" }}
    >
      <p>About · Help · Ads · Support · Contribute on Github</p>
      <br />
      <p>&copy; {new Date().getFullYear()} ThreeJ</p>
    </footer>
  );
}
