const menu = document.querySelectorAll(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

menu.forEach((item) => {
  item?.addEventListener("click", function () {
    mobileNav?.classList.toggle("show");
    // disable scroll on body
    document.body.classList.toggle("overflow-hidden");
  });
});
