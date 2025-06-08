import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom";
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/cart/Orders";
import Products from "./pages/services/Products";
import Contact from "./components/Contact";
import ProductDetails from "./pages/services/ProductDetails";
import ChangePassword from "./pages/auth/ChangePassword";
import Cart from "./pages/cart/Cart";
import useAuthInitializer from "./hooks/useAuthInitializer";
import PrivateRoute from './components/routes/PrivateRoute';


function App() {
  useAuthInitializer();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {/* Rutas que no requieren autenticación */}
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contactForm" element={<Contact />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />

        {/* Rutas que requieren autenticación */}
        <Route element={<PrivateRoute />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Rutas de autenticación */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-Password" element={<ChangePassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    )
  );

  return (
    <div className="App h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <Outlet />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};