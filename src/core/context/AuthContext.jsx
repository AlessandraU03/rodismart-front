import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");
    return token ? { token, userType } : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("userType", user.userType);
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userType");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
