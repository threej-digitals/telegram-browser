import { cookies } from "next/headers";
import "./globals.css";

export default async function RootLayout({ children }) {
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
