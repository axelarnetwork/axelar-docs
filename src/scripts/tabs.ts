/*
Client-side tabs. Written to replace the JSX / MDX tabs that don't load well
*/

export const addTabs = () => {
  const tabElements = document.getElementsByTagName("tabs");
  // Bootstrap every tab element
  for (let tab of tabElements) {
    let tabs = tab.children;
    let convertedTabs = [...tabs].map((tabItem) => ({
      title: tabItem["title"],
      content: tabItem.innerHTML,
    }));
    let currentIndex = 0;

    let titleBar = document.createElement("div");
    titleBar.innerHTML = `
        <ul role="tablist">
          ${convertedTabs
            .map(
              (tab, i) => `
            <li class="nav-item" role="presentation">
              <button class="nav-link ${
                i === 0 ? "active" : ""
              }" id="tab-${i}-tab" data-bs-toggle="tab" data-bs-target="#tab-${i}" type="button" role="tab" aria-controls="tab-${i}" aria-selected="true">${
                tab.title
              }</button>
            </li>
          `
            )
            .join("")}
        </ul>
      `;

    // render
    const render = () => {
      [...titleBar.children[0].children].map((button) =>
        button.classList.remove("active")
      );
      titleBar.children[0].children[currentIndex].classList.add("active");
      const sections = tab.getElementsByTagName("tab-item");
      [...sections].map((section) => section.classList.remove("active"));
      sections[currentIndex].classList.add("active");
    };

    // listen for clicks
    [...titleBar.children[0].children].map((button) => {
      button.addEventListener("click", () => {
        currentIndex = [...titleBar.children[0].children].indexOf(button);
        render();
      });
    });
    render();
    tab.insertBefore(titleBar, tab.firstChild);
  }
};
addTabs();
