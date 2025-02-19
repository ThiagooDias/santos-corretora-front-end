import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Menu,
  Building,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logo.svg";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#388936] text-white flex flex-col transition-all duration-300 h-full ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Topo do menu com botão para recolher */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/20">
          {!isCollapsed && (
            <img src={logo} alt="Santos Corretora" className="w-36 ml-4" />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white"
          >
            {isCollapsed ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>
        </div>

        {/* Navegação */}
        <nav className={`flex flex-col gap-4 ${isCollapsed ? "py-4" : "p-4"}`}>
          <NavItem
            to="/admin/imoveis"
            icon={<Building size={20} />}
            label="Imóveis"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/admin/proprietarios"
            icon={<Building size={20} />}
            label="Proprietários"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/admin/configuracoes"
            icon={<Settings size={20} />}
            label="Configurações"
            isCollapsed={isCollapsed}
          />
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, isCollapsed }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition"
  >
    <div className="ml-2">{icon}</div>
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

export default AdminLayout;
