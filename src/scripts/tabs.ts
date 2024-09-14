/*
Client-side tabs. Written to replace the JSX / MDX tabs that don't load well
*/

export const addTabs = () => {
  // Create window level registry to trigger re-renders
  window.savedTabRenderers = [];

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
    titleBar.classList.add("tab-bar");
    titleBar.innerHTML = `
        <ul role="tablist">
          ${convertedTabs
            .map(
              (tab, i) => `
            <li class="nav-item" role="presentation">
              <button class="nav-link ${
                i === 0 ? "active" : ""
              }" data-bs-toggle="tab" type="button" role="tab" aria-controls="tab-${i}" aria-selected="true">${
                tab.title
              }</button>
            </li>
          `,
            )
            .join("")}
        </ul>
      `;

    /* Save the choice as currentIndex, but don't render or touch localStorage
     */
    const applySavedChoice = () => {
      tabs = [...titleBar.querySelectorAll("button")];
      currentIndex = tabs.indexOf(
        tabs.find(
          (button) => button.innerText === localStorage["savedTabChoice"],
        ),
      );
      if (currentIndex === -1) {
        console.error("tab not found");
        currentIndex = 0;
      }
    };

    // render
    const render = () => {
      applySavedChoice();
      [...titleBar.children[0].children].map((button) =>
        button.classList.remove("active"),
      );
      titleBar.children[0].children[currentIndex].classList.add("active");
      const sections = tab.getElementsByTagName("tab-item");
      [...sections].map((section) => section.classList.remove("active"));
      sections[currentIndex].classList.add("active");
    };

    applySavedChoice();
    window.savedTabRenderers.push(render);

    // listen for clicks
    [...titleBar.children[0].children].map((button) => {
      button.addEventListener("click", () => {
        currentIndex = [...titleBar.children[0].children].indexOf(button);
        // This MUST be trimmed, otherwise there's an extra space at the end and nothing matches
        localStorage["savedTabChoice"] = (<HTMLButtonElement>(
          button
        )).innerText.trim();
        for (let renderer of window.savedTabRenderers) {
          renderer();
        }
      });
    });
    render();
    tab.insertBefore(titleBar, tab.firstChild);
  }
};
addTabs();
