import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar, { type SidebarSection } from "../components/Sidebar";
import ButtonAdd from "../components/ButtonAdd";
import ProductList from "../components/ProductList";
import PaymentPanel from "../components/PaymentPanel";
import CustomButton from "../components/CustomButton";
import CategoryPanel from "../components/CategoryPanel";

function AppLayout() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] =
    useState<SidebarSection>("categorias");

  const sectionTitle = useMemo(() => {
    switch (activeSection) {
      case "categorias":
        return "Categorías";
      case "productos":
        return "Productos";
      case "clientes":
        return "Clientes";
      case "compras":
        return "Compras";
      case "ventas":
        return "Ventas";
      default:
        return "Dashboard";
    }
  }, [activeSection]);

  const searchPlaceholder = useMemo(() => {
    switch (activeSection) {
      case "categorias":
        return "Buscar categoría";
      case "productos":
        return "Buscar producto";
      case "clientes":
        return "Buscar cliente";
      case "compras":
        return "Buscar compra";
      case "ventas":
        return "Buscar venta";
      default:
        return "Buscar";
    }
  }, [activeSection]);

  const renderMainContent = () => {
    switch (activeSection) {
      case "categorias":
        return <CategoryPanel search={search} />;

      case "productos":
        return (
          <div className="mt-4">
            <ProductList />
          </div>
        );

      case "dashboard":
        return (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Dashboard</h4>
              <p className="card-text mb-0">
                Selecciona una opción del menú para empezar.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">{sectionTitle}</h4>
              <p className="card-text mb-0">
                Este módulo aún no está conectado.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">Mi Tienda</h1>

      <div className="row align-items-center">
        <Sidebar
          className="col-md-2"
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        <SearchBar
          className="col-md-6"
          value={search}
          onChange={setSearch}
          placeholder={searchPlaceholder}
        />

        <CustomButton
          text={
            activeSection === "categorias"
              ? "Nueva categoría"
              : activeSection === "productos"
                ? "Agregar producto"
                : "Agregar"
          }
          icon="bi-plus-circle"
          column={3}
          position="end"
        />
      </div>

      <div className="col-md-11">{renderMainContent()}</div>

      {activeSection === "productos" && (
        <>
          <CustomButton
            text="Listar ventas"
            icon="bi-receipt"
            variant="outline-secondary"
            column={2}
            position="start"
          />

          <div className="col-md-11 d-flex justify-content-end">
            <div style={{ width: "100%", maxWidth: "350px" }}>
              <PaymentPanel total={150} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AppLayout;
