export type SidebarSection =
  | "dashboard"
  | "categorias"
  | "productos"
  | "clientes"
  | "compras"
  | "ventas";

interface SidebarProps {
  className?: string;
  activeSection: SidebarSection;
  onSelect: (section: SidebarSection) => void;
}

const Sidebar = ({ className, activeSection, onSelect }: SidebarProps) => {
  const handleCloseOffcanvas = (): void => {
    const offcanvasElement = document.getElementById(
      "offcanvasWithBothOptions",
    );

    if (!offcanvasElement) return;

    const bootstrapWindow = window as typeof window & {
      bootstrap?: {
        Offcanvas: {
          getOrCreateInstance: (element: Element) => { hide: () => void };
        };
      };
    };

    const offcanvasInstance =
      bootstrapWindow.bootstrap?.Offcanvas.getOrCreateInstance(
        offcanvasElement,
      );

    offcanvasInstance?.hide();
  };

  const handleSelect = (section: SidebarSection) => {
    onSelect(section);
    handleCloseOffcanvas();
  };

  return (
    <div className={className}>
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
          <SidenavBody activeSection={activeSection} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
};

interface SidenavBodyProps {
  activeSection: SidebarSection;
  onSelect: (section: SidebarSection) => void;
}

function SidenavBody({ activeSection, onSelect }: SidenavBodyProps) {
  const baseClassName =
    "btn text-start d-flex align-items-center gap-2 rounded px-3 py-2 w-100 border-0";
  const menuItems: {
    id: number;
    icono: string;
    texto: string;
    section: SidebarSection;
  }[] = [
    {
      id: 0,
      icono: "🏠",
      texto: "Dashboard",
      section: "dashboard",
    },
    {
      id: 1,
      icono: "📂",
      texto: "Categorías",
      section: "categorias",
    },
    {
      id: 2,
      icono: "📦",
      texto: "Productos",
      section: "productos",
    },
    {
      id: 3,
      icono: "👥",
      texto: "Clientes",
      section: "clientes",
    },
    {
      id: 4,
      icono: "🛒",
      texto: "Compras",
      section: "compras",
    },
    {
      id: 5,
      icono: "💰",
      texto: "Ventas",
      section: "ventas",
    },
  ];

  return (
    <nav className="nav flex-column gap-2">
      {menuItems.map((item) => {
        const isActive = activeSection === item.section;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.section)}
            className={`${baseClassName} ${
              isActive ? "bg-dark text-white" : "bg-light text-dark"
            }`}
          >
            <span>{item.icono}</span>
            <span>{item.texto}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default Sidebar;
