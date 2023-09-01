// Initialization of state is done inline in the header to prevent flicker

// Add an event listener to the button to toggle dark mode.
const button = document.querySelector("#dark-mode-button");
button?.addEventListener("click", (event) => {
  event?.stopPropagation();
  event?.preventDefault();
  const root = document.documentElement;
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
    localStorage?.setItem("theme", "light");
  } else {
    root.classList.add("dark");
    localStorage?.setItem("theme", "dark");
  }
});
