const currentUrl = window.location.href;
const links = document.querySelectorAll(".sideNav a, nav a");

for (let link of links) {
  if (link.href === currentUrl) {
    link.classList.add("active");
  }
}
