import { createContext, useState } from 'react';

export const VerifyContactContext = createContext();

export const VerifyContactProvider = ({ children }) => {
  const [verify, setVerify] = useState('');
  return (
    <VerifyContactContext.Provider value={{ verify, setVerify }}>
      {children}
    </VerifyContactContext.Provider>
  );
};
