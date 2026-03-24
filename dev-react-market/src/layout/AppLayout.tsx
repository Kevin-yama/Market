import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  const [search, setSearch] = useState("");
  console.log("Search value:", search);
  return (
    <div>
      <Sidebar />
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar categoría"
      />
    </div>
  );
}

export default AppLayout;
