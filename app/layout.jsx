import "./globals.css";
import Sidebar from "./sidebar";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex dark:bg-gray-900 justify-around ">
        <Sidebar />
        {children}
        <Script src="script/js.cookie.min.js"></Script>
        <Script src="script/main.js"></Script>
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.2/flowbite.min.js"></Script> */}
      </body>
    </html>
  );
}
