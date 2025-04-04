import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");
    const expiresAt = sessionStorage.getItem("expiresAt");
    return token ? { token, userType, expiresAt } : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("userType", user.userType);
      sessionStorage.setItem("expiresAt", user.expiresAt);
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userType");
      sessionStorage.removeItem("expiresAt");
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
