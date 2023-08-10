// Get the current URL
const currentUrl = window.location.href;

// Get all links on the page
const links = document.querySelectorAll("a");

// Loop through the links
for (let link of links) {
  // If the link's href matches the current URL
  if (link.href === currentUrl) {
    // Add the active class to the link
    link.classList.add("active");
  }
}