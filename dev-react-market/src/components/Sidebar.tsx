/*
const handleCloseOffcanvas = (): void => {
  const offcanvasElement = document.getElementById("sidebarMenu");

  if (!offcanvasElement) return;

  const bootstrapWindow = window as typeof window & {
    bootstrap?: {
      Offcanvas: {
        getOrCreateInstance: (element: Element) => { hide: () => void };
      };
    };
  };

  const offcanvasInstance =
    bootstrapWindow.bootstrap?.Offcanvas.getOrCreateInstance(offcanvasElement);

  offcanvasInstance?.hide();
};
*/

const Sidebar = (props: { className?: string }) => {
  return (
    <div className={props.className}>
      <button
        className="btn btn-dark"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        ☰ Menú
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="sidebarMenuLabel">
            Mi Tienda
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          />
        </div>
        <div className="offcanvas-body">
          <SidenavBody />
        </div>
      </div>
    </div>
  );
};

function SidenavBody() {
  const className =
    "nav-link d-flex align-items-center gap-2 rounded px-3 py-2 text-dark";
  const menuItems = [
    {
      id: 0,
      icono: "🏠",
      texto: "Dashboard",
      ruta: "/",
    },
    {
      id: 1,
      icono: "📂",
      texto: "Categorías",
      ruta: "/categorias",
    },
    {
      id: 2,
      icono: "📦",
      texto: "Productos",
      ruta: "/productos",
    },
    {
      id: 3,
      icono: "👥",
      texto: "Clientes",
      ruta: "/clientes",
    },
    {
      id: 4,
      icono: "🛒",
      texto: "Compras",
      ruta: "/compras",
    },
    {
      id: 5,
      icono: "💰",
      texto: "Ventas",
      ruta: "/ventas",
    },
  ];

  return (
    <>
      <nav className="nav flex-column gap-2">
        {menuItems.map((item) => (
          <a key={item.id} href={item.ruta} className={className}>
            <span>{item.icono}</span>
            <span>{item.texto}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;
