import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const [formData, message, handleInputChange, handleAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAuth("login");
      navigate("/products", { state: { showSuccess: true } });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", error, {
        position: "top-center",
      });
    }
  };
  

  return (
    <div className="container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox">
      <ToastContainer /> 
      <form
        onSubmit={handleSubmit}
        className="container md:w-[518px] md:h-[500px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox"
      >
        <div className="p-5 mt-0">
          <button className="btn-secondary mb-2">Compra Aquí...</button>
        </div>
        <div className="anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-primary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-primary"
            required
          />
          <button
            type="submit"
            className="w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary"
          >
            Login
          </button>
        </div>
        <footer className="p-5 mx-10 bottom-0 anyBox">
          <Link to="/reset-Password" className="btn-secondary mb-5">
            ¿Olvidó su contraseña?
          </Link>
        </footer>
        <footer className="p-5 mx-10 bottom-0 anyBox">
          <Link to="/register" className="btn-secondary mb-5">
            ¿No tienes cuenta?
          </Link>
        </footer>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
