import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import { useContext } from "react";

export default function SmallDeviceHeader() {
  const { location } = useContext(GlobalContext);
  return (
    <div className="fixed top-0 items-center justify-between w-full flex flex-column z-20 sm:hidden py-2 px-4 bg-gray-300 dark:bg-gray-700">
      <Image
        className="rounded cursor-pointer"
        src={"/telegram-browser/favicon.png"}
        width={45}
        height={45}
        alt="Telegram browser logo"
        onClick={() => {
          window.location.href = location.base;
        }}
      ></Image>
      <span className="dark:text-white font-bold text-xl">
        Telegram Browser
      </span>
      <button
        className="dark:text-white w-7 h-7 p-1 bg-slate-400 dark:bg-gray-800 rounded-sm"
        onClick={() => {
          let aside = document.querySelector("aside");
          aside.classList.contains("hidden")
            ? aside.classList.remove("hidden")
            : aside.classList.add("hidden");
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO2YwUkEQRBFH+LBgxEIXoxAw/AgRqIBTDeMixHowembKQiCYWgEXgQD0O1ZVkRKVpa9OMKOTnf1SD2o8/ziF49mwDAMozik4Vwa3iQgRUzzlWXSZ4FX9dDh27ysv0BgIoF5AaFlOXNpOOt9StFz2XpEc6LnonfwVRM1G9Fzo7aA405qNn+9wHKJ7dbzoBD+fvFthqCt2Ymep2xn43ieOXYZkug5iI5phvDTWLE/aPjVEhWH0fGeMPxHW3FMStqK04R3f0IOUug1/kWX6np1A+hSTa9uQF3m1mtMoctcek2qy9R6zaLLpHrNpcu+rPs8plTEFlDGGtDGGtDGGtDGGtDGGtDGGhhBA48SOKJU5Ofgs8Xvcblmi5KR7vC3csUeY0DGdC5djOpcuhjVuRjGP+ET+40TJj+/lmAAAAAASUVORK5CYII=" />
      </button>
    </div>
  );
}
