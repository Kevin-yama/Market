//import { useState } from "react";
//import SearchBar from "../components/SearchBar";
import AppLayout from "../layout/AppLayout";

// eslint-disable-next-line react-hooks/rules-of-hooks
//const [search, setSearch] = useState("");

function app() {
  return (
    <div className="container-fluid">
      <AppLayout />
      {/* 
        <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar categoría"
      />
        */}
    </div>
  );
}

export default app;
