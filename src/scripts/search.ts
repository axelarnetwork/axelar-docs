import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { searchBox, hits } from "instantsearch.js/es/widgets";

const searchClient = algoliasearch(
  "ECUG3H1E0M",
  "79f21d06bc68b25fa46dda5e23318a3f"
);

const search = instantsearch({
  indexName: "documentation",
  searchClient,
  insights: true,
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
            <h2>${components.Highlight({ hit, attribute: "title" })}</h2>
            <p>${components.Snippet({ hit, attribute: "url" })}</p>
          </a>
        `;
      },
    },
  }),
]);

search.start();

function stateChange(context) {
  const query = context.uiState.documentation.query || "";
  const search_string = query;

  if (search_string.length < 3) {
    document.querySelector("#search-results").classList.remove("show");

    return false;
  } else {
    document.querySelector("#search-results").classList.add("show");
  }
}
