/*
Client-side tabs. Written to replace the JSX / MDX tabs that don't load well
*/

declare global {
  interface Window {
    savedTabRenderers: any[];
  }
}

const tabActiveClass = [
  "border-primary",
  "bg-primary",
  "text-white",
  "aria-selected",
];

export const addTabs = () => {
  window.savedTabRenderers = [];

  const tabElements = document.getElementsByTagName("tabs");

  for (let tab of tabElements) {
    tab.classList.add("prose-table:my-0");
  }

  for (let tab of tabElements) {
    let tabs: any = tab.children;
    let convertedTabs = [...tabs].map((tabItem) => ({
      title: tabItem["title"],
      content: tabItem.innerHTML,
    }));
    let currentIndex = 0;

    let titleBar = document.createElement("div");
    titleBar.classList.add("tab-bar");
    titleBar.innerHTML = `
        <ul role="tablist" class="flex my-0  list-none p-0  not-prose  ">
          ${convertedTabs
            .map(
              (tab, i) => `
            <li role="presentation">
              <button class=" ${
                i === 0
                  ? "rounded-tl-md"
                  : i === convertedTabs.length - 1
                    ? "rounded-tr-md"
                    : ""
              } px-4 py-1  font-medium border-t border-x  border-border text-foreground " type="button" role="tab" aria-controls="tab-${i}" aria-selected="${i === 0}">${tab.title}</button>
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
        currentIndex = 0;
      }
    };

    const render = () => {
      applySavedChoice();
      const wrapperClass = [
        "border",
        "p-5",
        "bg-background-neutral-dark",
        "rounded-b-lg",
        "rounded-tr-lg",
        "border-border",
      ];

      [...titleBar.children[0].children].map((li) =>
        li.querySelector("button")?.classList.remove(...tabActiveClass),
      );

      titleBar.children[0].children[currentIndex]
        .querySelector("button")
        ?.classList.add(...tabActiveClass);

      const sections = tab.getElementsByTagName("tab-item");

      [...sections].map((section) => {
        section.classList.add("hidden");
        const firstChild = section.firstElementChild;
        // if (firstChild?.tagName.toLowerCase() === "table") {
        //   return;
        // }

        let wrapperDiv = section.querySelector(".tab-item-content");

        if (!wrapperDiv) {
          wrapperDiv = document.createElement("div");
          wrapperDiv.classList.add(...wrapperClass, "tab-item-content");

          while (section.firstChild) {
            wrapperDiv.appendChild(section.firstChild);
          }

          section.appendChild(wrapperDiv);
        }

        section.classList.add("hidden");
      });

      sections[currentIndex].classList.remove("hidden");
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
