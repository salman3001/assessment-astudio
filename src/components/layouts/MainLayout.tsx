import Breadcrumbs from "../BreadCrumbs";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="antialiased max-w-7xl mx-auto p-5">
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
