import React from "react";
import SearchLogo from "@icons/search.svg";
import XLogo from "@icons/X.svg";
import { IconButton } from "@/components/ui-componets/buttons/iconButton";
import { useTemplates } from "./template-context";

const SearchTemplate = () => {
  const { query, setQuery } = useTemplates();
  return (
    <div className="relative w-full max-w-60 flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar"
        className={`w-full border-b h-8 px-2 text-xs md:text-sm focus:outline-none focus:ring-0 border-secondary ${
          query ? "text-black" : "text-gray-400"
        }`}
      />
      {query ? (
        <IconButton onClick={() => setQuery("")}>
          <img src={XLogo} alt="Cerrar" className="w-10 h-10" />
        </IconButton>
      ) : (
        <IconButton>
          <img src={SearchLogo} alt="Buscar" className="w-10 h-10" />
        </IconButton>
      )}
    </div>
  );
};
export default SearchTemplate;
