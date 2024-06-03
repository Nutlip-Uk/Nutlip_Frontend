import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState([]);

  return (
    <ImageContext.Provider value={{ url, setUrl }}>
      {children}
    </ImageContext.Provider>
  );
};