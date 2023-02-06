import { cookies } from "next/headers";
import "./globals.css";
import Sidebar from "./sidebar";

export default async function RootLayout({ children }) {
  const darkMode = cookies().get("darkMode").value || "";

  return (
    <html lang="en" className={darkMode == "on" ? "dark" : ""}>
      <head />
      <body className="flex dark:bg-gray-900 justify-around ">
        <Sidebar darkMode={darkMode} />
        {children}
      </body>
    </html>
  );
}
