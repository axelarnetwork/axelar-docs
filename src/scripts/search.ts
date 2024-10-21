const loadSearch = async () => {
  document.querySelector("#search")?.removeEventListener("click", loadSearch);
  document.querySelector("#search")?.removeEventListener("keydown", loadSearch);
  const algoliasearch = (await import("algoliasearch/lite")).default;
  const instantsearch = (await import("instantsearch.js")).default;
  const { searchBox, hits } = await import("instantsearch.js/es/widgets");

  /* Hack to make inputs not get overwritten during async loading by Algolia
   * No matter what we do, we get into a race condition with alogolia and user
   * typing (user types after setting placeholder, then placeholder overrides it)
   * We don't want to load everything up front because it's 1.1MB of JS
   * So we're going to hack the input box to keep its value as you type
   */
  const inputBox = <HTMLInputElement>document.querySelector("#search input");
  let previousInput = inputBox?.value;
  const hackInput = (ev) => {
    if (ev["data"]) {
      console.log(
        "hacking to make input value",
        inputBox.value,
        previousInput,
        ev["data"],
      );
      inputBox.value = previousInput + ev["data"];
    }
    previousInput = inputBox.value;
  };
  inputBox?.addEventListener("input", hackInput);
  // Hopefully we don't need this hack after a couple seconds, enough time for Algolia to stop loading
  setTimeout(() => {
    inputBox.removeEventListener("input", hackInput);
  }, 2000);

  const searchClient = algoliasearch(
    "ECUG3H1E0M",
    "79f21d06bc68b25fa46dda5e23318a3f",
  );

  /* Save search state so it's not lost with widget load */
  const typed = (<HTMLInputElement>document.querySelector("#search input"))
    .value;

  const search = instantsearch({
    indexName: "documentation",
    searchClient,
    insights: {
      insightsInitParams: {
        useCookie: true,
      },
    },
    onStateChange: stateChange,
    initialUiState: {
      documentation: {
        query: typed,
      },
    },
  });

  let timerId = 0;
  let debounceTime = 300;

  search.addWidgets([
    searchBox({
      container: "#search",
      // Debounce the search for 300ms
      queryHook(query, refine) {
        clearTimeout(timerId);
        timerId = window.setTimeout(() => refine(query), debounceTime);
      },
      placeholder: typed,
    }),

    hits({
      container: "#search-results",
      templates: {
        item(hit, { html, components, sendEvent }) {
          // Link directly to matched content
          const matched = null; // = hit._highlightResult?.contents?.matchedWords[0];
          return html`
            <a
              href="${hit.url +
              (matched ? "#:~:text=" + encodeURIComponent(matched) : "")}"
              onClick="${() => {
                sendEvent("click", hit, "Search result clicked");
              }}"
            >
              <div style="font-weight:bold;">
                ${components.Highlight({ hit, attribute: "title" })}
              </div>
              <div>${components.Snippet({ hit, attribute: "contents" })}</div>
            </a>
          `;
        },
      },
    }),
  ]);

  search.start();

  function stateChange({ uiState, setUiState }) {
    const query = uiState.documentation.query || "";
    const search_string = query;

    if (search_string.length < 3) {
      document.querySelector("#search-results")?.classList.remove("show");

      return false;
    } else {
      document.querySelector("#search-results")?.classList.add("show");
    }
    setUiState(uiState);
  }
};

document.getElementById("search")?.addEventListener("click", loadSearch);
document.getElementById("search")?.addEventListener("keydown", loadSearch);
