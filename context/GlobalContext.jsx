import { createContext, useState } from "react";
import ChatContextProvider from "./ChatContextProvider";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children, cookies, location }) {
  const [darkMode, setDarkMode] = useState(cookies.darkMode || "on");
  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        cookies: cookies,
        location: location,
      }}
    >
      <ChatContextProvider cookies={cookies} location={location}>
        {children}
      </ChatContextProvider>
    </GlobalContext.Provider>
  );
}
