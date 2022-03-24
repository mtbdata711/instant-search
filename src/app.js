import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const search = instantsearch({
  indexName: "steam-video-games",
  searchClient: instantMeiliSearch(
    "https://integration-demos.meilisearch.com",
    "q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47",
    {
      limitPerRequest: 30
    }
  )
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  }),
  instantsearch.widgets.clearRefinements({
    container: "#clear-refinements"
  }),
  instantsearch.widgets.refinementList({
    container: "#genres-list",
    attribute: "genres"
  }),
  instantsearch.widgets.refinementList({
    container: "#players-list",
    attribute: "players"
  }),
  instantsearch.widgets.refinementList({
    container: "#platforms-list",
    attribute: "platforms"
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 6,
    snippetEllipsisText: "...",
    attributesToSnippet: ["description:50"]
  }),
  instantsearch.widgets.refinementList({
    container: "#misc-list",
    attribute: "misc"
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <img src="{{image}}" align="left" />
          <div class="hit-description">
            {{#helpers.snippet}}{ "attribute": "description" }{{/helpers.snippet}}
          </div>
          <div class="hit-info">price: {{price}}</div>
          <div class="hit-info">release date: {{releaseDate}}</div>
        </div>
      `
    }
  }),
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
]);

search.start();
