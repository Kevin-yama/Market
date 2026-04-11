import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import ButtonAdd from "../components/ButtonAdd";
import ProductList from "../components/ProductList";
import PaymentPanel from "../components/PaymentPanel";
import CustomButton from "../components/CustomButton";

function AppLayout() {
  const [search, setSearch] = useState("");
  console.log("Search value:", search);
  return (
    <div className="container">
      <h1 className="text-center mt-3">Mi Tienda</h1>
      <div className="row align-items-center">
        <Sidebar className="col-md-2" />
        <SearchBar
          className="col-md-6"
          value={search}
          onChange={setSearch}
          placeholder="Buscar categoría"
        />
        <CustomButton
          text="Agregar"
          icon="bi-plus-circle"
          column={3}
          position="end"
        />
      </div>
      <div className="col-md-11">
        <ProductList />
      </div>
      <CustomButton
        text="Listar ventas"
        icon="bi-receipt"
        variant="outline-secondary"
        column={2}
        position="start"
      />

      {/* PANEL DE PAGO */}
      <div className="col-md-11 d-flex justify-content-end">
        <div style={{ width: "100%", maxWidth: "350px" }}>
          <PaymentPanel total={150} />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
