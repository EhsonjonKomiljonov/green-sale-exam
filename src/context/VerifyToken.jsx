import { createContext, useState } from 'react';

export const VerifyTokenContext = createContext();

export const VerifyTokenProvider = ({ children }) => {
  const [verifyToken, setVerifyToken] = useState(false);
  return (
    <VerifyTokenContext.Provider value={{ verifyToken, setVerifyToken }}>
      {children}
    </VerifyTokenContext.Provider>
  );
};
