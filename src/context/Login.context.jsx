import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
const [userInformation, setUserInformation] = useState(null);

  const handleLogin = async (formData) => {
    // Login logic using fetch (replace with your API call)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    return response; // Return the response object for further processing (optional)
  };



useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInformation');
  
    if (storedToken) {
      // Check if user information is also stored locally
      if (storedUserInfo) {
        setUserInformation(JSON.parse(storedUserInfo)); // Set user information from local storage
      } else {
        // Fetch user information from API if not stored locally (optional)
        // ... (your existing API call to fetch user information)
      }
    }
  }, []);


  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInformation');
  
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
  
      if (!response.ok) {
        console.error('Error logging out on server');
      }
    } catch (error) {
      console.error('Error logging out on server', error);
    }

    router.replace('/register?option=login');
  };


  return (
    <LoginContext.Provider value={{ userInformation, handleLogin, setUserInformation }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
