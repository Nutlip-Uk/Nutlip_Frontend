import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from "next/router";
export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(null);
  const router = useRouter();

  const handleLogin = async (formData) => {
    // Login logic using fetch (replace with your API call)
    const response = await fetch('aws url for now, http://ec2-13-60-41-27.eu-north-1.compute.amazonaws.comapi/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response; // Return the response object for further processing (optional)
    GetUser();
  };
  const GetUser = async () => {
    const response = await fetch(`aws url for now, http://ec2-13-60-41-27.eu-north-1.compute.amazonaws.comapi/users/${userInformation.user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();
    console.log("handleWelcome data:", data);

    if (response.ok) {
      console.log(data.newUser);
      console.log(data)
    }
    return response;
  };


  const handleWelcome = async () => {
    const response = await fetch(`aws url for now, http://ec2-13-60-41-27.eu-north-1.compute.amazonaws.comapi/users/${userInformation.user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newUser: false
      })
    });
    const data = await response.json();
    console.log("handleWelcome data:", data);

    if (response.ok) {
      console.log(data);
    }
    return response;
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
    window.location.reload();
  };


  return (
    <LoginContext.Provider value={{ userInformation, handleLogin, setUserInformation, handleLogout, handleWelcome }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
