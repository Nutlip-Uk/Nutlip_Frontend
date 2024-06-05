import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState([]);
  const [viewOptions , setViewOptions]=useState("")
 

  return (
    <ImageContext.Provider value={{ url, setUrl, viewOptions,setViewOptions }}>
      {children}
    </ImageContext.Provider>
  );
};