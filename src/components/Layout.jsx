import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="">
      <Header />
      <main className="flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
