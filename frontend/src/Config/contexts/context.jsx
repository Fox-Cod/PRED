// context.js
import React, { createContext, useEffect } from 'react';
import userAuth from '../auth/userAuth';
import { check, profile } from '../api/userAPI';
import { useLocalObservable } from 'mobx-react-lite';

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const user = useLocalObservable(() => new userAuth());
useEffect(() => {
  const fetchUserData = async () => {
    user.setLoading(true);
    try {
      const isAuthenticated = await check();
      user.setUserId(isAuthenticated.token.idTeacher);
      user.setDefaultRole(isAuthenticated.token.role);
      user.setToken(isAuthenticated.token);

      if (isAuthenticated && isAuthenticated.token) {
        const data = await profile();
        user.setIsAuth(true);
        user.setProfile(data.profile);
        user.setActivity(data.activity);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      user.setIsAuth(false);
      console.error("User is not authenticated:", error);
    } finally {
      user.setLoading(false);
    }
  };

  fetchUserData();
}, [user]);


  return (
    <Context.Provider value={{ user }}>
      {children}
    </Context.Provider>
  );
};
