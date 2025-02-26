import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./libs/routes";
import Products from "./pages/Products";
import Users from "./pages/Users";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home()} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.products()} element={<Products />} />
          <Route path={routes.users()} element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
