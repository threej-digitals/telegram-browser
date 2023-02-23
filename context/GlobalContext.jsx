import { createContext, useState } from "react";
import ChatContextProvider from "./ChatContextProvider";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children, cookies }) {
  const [darkMode, setDarkMode] = useState(cookies.darkMode || "on");
  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        cookies: cookies,
      }}
    >
      <ChatContextProvider cookies={cookies}>{children}</ChatContextProvider>
    </GlobalContext.Provider>
  );
}
