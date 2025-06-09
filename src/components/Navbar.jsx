import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import carBuy from "../assets/CarBuy.svg";
import moon from "../assets/moon.svg";
import lupa from "../assets/lupa.svg";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, validateCart } = useCart();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const fetchCartItems = async () => {
      if (isAuthenticated) {
        try {
          await validateCart();
        } catch (error) {
          console.error("Error al validar el carrito:", error);
        }
      }
    };
    fetchCartItems();
  }, [isAuthenticated]);

  const handleCartClick = async () => {
    if (isAuthenticated) {
      try {
        await validateCart();
        navigate("/cart");
      } catch (error) {
        console.error("Error al acceder al carrito:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="top-0 relative justify-center place-content-center items-center h-134px flex">
      <div className="hidden md:flex md:m-5">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="flex-row p-4">
        <div className="p-4">
          <ol className="flex gap-2 md:gap-14 bg-tertiary w-[274px] md:w-[426px] h-[48px] lg:w-[1200px] lg:gap-44 justify-center items-center place-content-center rounded-md text-white mb-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="relative">
              <button onClick={handleCartClick}>
                <img src={carBuy} alt="Ver carrito" />
                {isAuthenticated &&
                  Array.isArray(cartItems) &&
                  cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
                      {cartItems.length}
                    </span>
                  )}
              </button>
            </li>
          </ol>
        </div>
        <div className="hidden md:flex md:bg-tertiary md:text-white md:w-[314px] lg:w-[1000px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12">
          <img src={lupa} alt="Buscar" className="ml-8" />
          <input
            type="text"
            placeholder="Search something..."
            className="hidden md:flex md:bg-tertiary md:text-white md:w-[314px] lg:w-[800px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12"
          />
        </div>
      </div>
      <div className="m-8">
        <button>
          <img src={moon} alt="Modo oscuro" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
