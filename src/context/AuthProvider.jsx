import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await localforage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    const { email, ...profileData } = userData;
    const updatedUser = { email, ...profileData };
    setUser(updatedUser);
    await localforage.setItem('user', updatedUser);
    await localforage.setItem(`userProfile_${email}`, profileData);
  };

  const updateUser = async (updatedUser) => {
    setUser(updatedUser);
    await localforage.setItem('user', updatedUser);
    const userLocalStorageKey = `userData_${updatedUser.id}`;
    const existingUserData = await localforage.getItem(userLocalStorageKey) || {};
    const updatedUserData = { ...existingUserData, ...updatedUser };
    await localforage.setItem(userLocalStorageKey, updatedUserData);
  };
  const logout = () => {
    setUser(null);
    localforage.removeItem('user');
  };

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  const authContextValue = {
    user,
    login,
    logout,
    isAdmin,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};