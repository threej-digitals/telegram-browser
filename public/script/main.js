(() => {
  //apply dark mode as per user pref
  if (Cookies.get("darkMode") == "on") {
    document.querySelector("html").classList.add("dark");
    document.getElementById("darkModeBtn").setAttribute("checked", "");
  }
})();
