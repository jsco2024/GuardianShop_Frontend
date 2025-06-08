import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoggedIn: false
  });
  const login = (userData, token) => {
    setAuth({ user: userData, token, isLoggedIn: true });
    localStorage.setItem('authToken', token);
  };
  const logout = () => {
    setAuth({ user: null, token: null, isLoggedIn: false });
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthLogin = () => {
  return useContext(AuthContext);
};

 
