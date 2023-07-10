import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch('Q1ZEL7FNST', '57ab18577c83af9a0438659d19e20e2a');

const search = instantsearch({
  indexName: 'my_first_index',
  searchClient,
});

// search.addWidgets([
//   searchBox({
//     container: "#search"
//   }),

//   hits({
//     container: "#hits"
//   })
// ]);

// search.start();
