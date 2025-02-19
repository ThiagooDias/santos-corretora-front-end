import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/PropertyDetails";
import AdminLayout from "./components/AdminLayout";
import AdminProperties from "./pages/AdminOwner";

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

          <Route path="proprietarios" element={<AdminProperties />} />
          {/* <Route path="proprietarios/novo" element={<AdminProperties />} /> */}

          {/* <Route index path="imoveis" element={<AdminProperties />} /> */}
          {/* <Route path="imoveis/:id" element={<AdminProperties />} /> */}
          {/* <Route path="imoveis/novo" element={<AdminProperties />} /> */}
          {/* <Route path="configuracoes" element={<AdminProperties />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
