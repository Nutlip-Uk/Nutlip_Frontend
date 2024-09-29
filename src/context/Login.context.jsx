import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from "next/router";
export const LoginContext = createContext();

<<<<<<< HEAD

=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
const LoginProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(null);
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = async (formData) => {
    // Login logic using fetch (replace with your API call)
    const response = await fetch('https://nutlip-server.uc.r.appspot.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response; // Return the response object for further processing (optional)
    GetUser();

  };

<<<<<<< HEAD
=======


>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  const GetUser = async () => {
    const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/users/${userInformation.user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();
    console.log("handleWelcome data:", data);

    if (response.ok) {
      console.log(data.newUser);
      console.log(data)
      const loggedin = localStorage.setItem("Loggedin", true);
      setIsUserLoggedIn(loggedin);
    }
    return response;
  };

<<<<<<< HEAD
=======

>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  const handleWelcome = async () => {
    const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/users/${userInformation.user.id}`, {
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
<<<<<<< HEAD
    router.push("/");
=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  };


  return (
    <LoginContext.Provider value={{ userInformation, handleLogin, setUserInformation, handleLogout, handleWelcome, isUserLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
