import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas (landing page) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="imovel/:id" element={<Details />} />
        </Route>

        {/* Rotas do admin */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="imoveis" replace />} />

          <Route path="proprietarios" element={<AdminOwner />} />
          <Route path="proprietarios/novo" element={<NewOwner />} />
          <Route path="proprietarios/edit/:id" element={<EditOwner />} />

          <Route path="imoveis" element={<AdminProperties />} />
          <Route path="imoveis/:id" element={<NewProperty />} />
          {/* <Route path="imoveis/novo" element={<AdminProperties />} /> */}

          <Route path="configuracoes" element={<AdminConfig />} />
        </Route>
      </Routes>
    </Router>
  );
}
