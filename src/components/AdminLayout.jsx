import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Building,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logo.svg";
import { Breadcrumbs } from "./Breadcrumb";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      <aside
        className={`bg-[#388936] text-white flex flex-col transition-all duration-300 h-screen ${
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
        <nav
          className={`text-lg font-semibold flex flex-col gap-4 ${
            isCollapsed ? "py-4" : "p-4"
          }`}
        >
          <NavItem
            to="/admin/imoveis"
            icon={<Building size={24} />}
            label="Imóveis"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/admin/proprietarios"
            icon={<Users size={24} />}
            label="Proprietários"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/admin/configuracoes"
            icon={<Settings size={24} />}
            label="Configurações"
            isCollapsed={isCollapsed}
          />
        </nav>
      </aside>

      <main
        className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ml-${
          isCollapsed ? "16" : "64"
        } overflow-y-auto h-screen`}
      >
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 mx-3 rounded-lg transition ${
        isActive ? "bg-white/20 text-white" : "hover:bg-white/10 text-gray-200"
      }`}
    >
      <div>{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default AdminLayout;
