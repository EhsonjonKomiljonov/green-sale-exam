import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('phone') || '');

  useEffect(() => {
    if (auth) localStorage.setItem('phone', auth);
    else localStorage.removeItem('phone');
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
