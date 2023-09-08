import { createContext, useState } from 'react';

export const LoaderImageContext = createContext();

export const LoaderImageProvider = ({ children }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <LoaderImageContext.Provider value={{ isLoadingImage, setIsLoadingImage }}>
      {children}
    </LoaderImageContext.Provider>
  );
};
