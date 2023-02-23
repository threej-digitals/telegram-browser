import LeftSidebar from "@/components/sidebar/leftSidebar";
import RightSidebar from "./sidebar/rightSidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 dark:bg-gray-900 w-full">
        <LeftSidebar />
        {children}
        <RightSidebar />
      </div>
    </>
  );
}
