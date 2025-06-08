import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp >= currentTime) {
          dispatch(login());
        } else {
          dispatch(logout());
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(logout());
        localStorage.removeItem("authToken");
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
};

export default useAuthInitializer;