import React, { createContext, useState, useContext } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState([]);
  const [viewOptions, setViewOptions] = useState("")
  const [loading, setLoading] = useState(false);

  return (
    <ImageContext.Provider value={{ url, setUrl, viewOptions, setViewOptions, loading, setLoading }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);