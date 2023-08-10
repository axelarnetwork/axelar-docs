const loadSearch = async () => {
  const algoliasearch = (await import("algoliasearch/lite")).default;
  const instantsearch = (await import("instantsearch.js")).default;
  const { searchBox, hits } = await import("instantsearch.js/es/widgets");

  console.log(algoliasearch);

  const searchClient = algoliasearch(
    "ECUG3H1E0M",
    "79f21d06bc68b25fa46dda5e23318a3f"
  );

  const search = instantsearch({
    indexName: "documentation",
    searchClient,
    insights: {
      insightsInitParams: {
        useCookie: true,
      },
    },
    onStateChange: stateChange,
  });

  search.addWidgets([
    searchBox({
      container: "#search",
    }),

    hits({
      container: "#search-results",
      templates: {
        item(hit, { html, components, sendEvent }) {
          return html`
            <a
              href="${hit.url}"
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
    console.log("query is", query);
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
