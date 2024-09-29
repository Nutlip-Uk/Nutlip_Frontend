<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';
=======
import React, { createContext, useState } from 'react';
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState([]);
<<<<<<< HEAD
  const [viewOptions, setViewOptions] = useState("")
  const [loading, setLoading] = useState(false);

  return (
    <ImageContext.Provider value={{ url, setUrl, viewOptions, setViewOptions, loading, setLoading }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
=======
  const [viewOptions , setViewOptions]=useState("")
 

  return (
    <ImageContext.Provider value={{ url, setUrl, viewOptions,setViewOptions }}>
      {children}
    </ImageContext.Provider>
  );
};
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
