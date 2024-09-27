import "@docsearch/css";
import { DocSearch } from "@docsearch/react";
import "../../styles/global.css";
const Search = () => {
  return (
    <div className="w-auto min-w-[18rem]">
      <DocSearch
        appId="U6H58F6C6B"
        indexName="docs-axelar"
        apiKey="3f14cd2d84865f2f3cc66911d3dba8ed"
        hitComponent={({ hit, children }) => (
          <a
            href={hit.url.replace("https://akash.network", "")}
            className="block"
          >
            {children}
          </a>
        )}
      />
    </div>
  );
};

export default Search;
