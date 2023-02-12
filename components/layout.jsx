import { cookies } from "next/headers";

export default async function Layout({ children }) {
  return (
    <html
      lang="en"
      className={(cookies().get("darkMode").value || "") == "on" ? "dark" : ""}
    >
      <head />
      <body className="flex dark:bg-gray-900 justify-around ">{children}</body>
    </html>
  );
}
