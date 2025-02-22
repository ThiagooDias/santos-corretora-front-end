import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

const routeNames = {
  admin: "Admin",
  imoveis: "Imóveis",
  proprietarios: "Proprietários",
  configuracoes: "Configurações",
  novo: "Novo",
  edit: "Editar",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filteredPaths = location.pathname
  .split("/")
  .filter((path) => path && !/^[a-f0-9]{24}$/i.test(path));

  
  const paths = filteredPaths.map((path) => routeNames[path] || path);

  return (
    <div
      className={`flex items-center gap-2 text-gray-700 mb-4 ${
        paths.length === 2 ? "ml-10" : ""
      }`}
    >
      {paths.length > 2 && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {paths.map((path, index) => {
        const fullPath = `/${filteredPaths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={16} />}

            {isLast ? (
              <span className="text-gray-500">{path}</span>
            ) : (
              <Link to={fullPath} className="underline underline-offset-2 hover:underline-offset-4">
                {path}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
