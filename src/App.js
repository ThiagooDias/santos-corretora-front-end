import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Certifique-se do caminho correto
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/PropertyDetails";
import AdminLayout from "./components/AdminLayout";
import AdminOwner from "./pages/AdminOwner";
import NewOwner from "./pages/NewOwner";
import EditOwner from "./pages/EditOwner";
import AdminProperties from "./pages/AdminProperties";
import AdminConfig from "./pages/AdminConfig";
import NewProperty from "./pages/NewProperty";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="imovel/:id" element={<Details />} />
          </Route>

          {/* Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="imoveis" replace />} />
            <Route path="proprietarios" element={<AdminOwner />} />
            <Route path="proprietarios/novo" element={<NewOwner />} />
            <Route path="proprietarios/edit/:id" element={<EditOwner />} />
            <Route path="imoveis" element={<AdminProperties />} />
            <Route path="imoveis/novo" element={<NewProperty />} />
            <Route path="configuracoes" element={<AdminConfig />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
