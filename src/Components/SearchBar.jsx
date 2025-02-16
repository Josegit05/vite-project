import "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-hooks-web";
import "./SearchBar.css";

// Configuración del cliente de Algolia
const searchClient = algoliasearch("8V73ZL6AIL", "5455ecee08250aee1e0b796fc9d6d414");

// Componente para renderizar cada resultado
const Hit = ({ hit }) => (
  <div className="hit">
    <h4>
      <Highlight attribute="title" hit={hit} />
    </h4>
    <p>
      <Highlight attribute="description" hit={hit} />
    </p>
  </div>
);

// Componente principal de la barra de búsqueda
export const SearchBar = () => {
  return (
    <div className="search-container">
      <InstantSearch searchClient={searchClient} indexName="movie">
        <SearchBox
          placeholder="Busca una película..."
          classNames={{
            root: "searchbox",
            input: "searchbox-input",
            submit: "searchbox-submit",
            reset: "searchbox-reset",
          }}
        />
        <Hits hitComponent={Hit} classNames={{ list: "hits-list", item: "hits-item" }} />
      </InstantSearch>
    </div>
  );
};

