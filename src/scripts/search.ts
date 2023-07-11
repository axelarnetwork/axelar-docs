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
  searchFunction: require3,
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

function require3(helper) {
  if (helper.state.query) {
    const search_string = helper.state.query;

    if (search_string.length < 3) {
      document.querySelector("#search-results").classList.remove("show");

      return false;
    } else {
      console.log("had more than 3 chars, let us search!");
      document.querySelector("#search-results").classList.add("show");
    }
    helper.search();
  }
}
