let isDark = false;
const setDarkMode = (setToDark: boolean) => {
  console.log("setting to ", setToDark);
  const body = document.body;
  const darkModeClass = "dark";

  // Check if the body tag already has the dark mode class.
  if (!setToDark) {
    body.classList.remove(darkModeClass);
  } else {
    body.classList.add(darkModeClass);
  }
  localStorage.setItem("theme", setToDark ? "dark" : "light");
};

const systemWantsDarkMode = () => {
  if (window.matchMedia) {
    const query = window.matchMedia("prefers-color-scheme: dark");
    return query.matches;
  }
  return false;
};

// Set initial state
let theme = localStorage.getItem("theme");
if (theme === "dark" || (theme === null && systemWantsDarkMode())) {
  isDark = true;
} else if (theme === "light") {
  isDark = false;
  // Handle legacy system setting
} else if (theme === "system") {
  isDark = systemWantsDarkMode();
}

setDarkMode(isDark);
// Add an event listener to the button to toggle dark mode.
const button = document.querySelector("#dark-mode-button");
button?.addEventListener("click", (event) => {
  event?.stopPropagation();
  event?.preventDefault();
  isDark = !isDark;
  setDarkMode(isDark);
});
