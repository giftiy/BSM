

import React, { useState, createContext, useEffect, useContext } from 'react';


const AuthContext = createContext(null);


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const login = async ({ userId, password }) => {
    setLoading(true);
    let role = 'customer';
    if (userId.toLowerCase().includes('staff')) role = 'staff';
    else if (userId.toLowerCase().includes('admin')) role = 'admin';

    const loggedInUser = {
      id: Date.now(),
      fullName: userId.split('@')[0],
      email: `${userId}@example.com`,
      role,
    };

    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setLoading(false);
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};