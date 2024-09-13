import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //login function
  const login = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (user) {
      setUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };
  //logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };
  //register function
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    //check if the email is already registered
    if (users.some((u) => u.email === userData.email)) {
      return false;
    }

    //add the new user to the list of users
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
