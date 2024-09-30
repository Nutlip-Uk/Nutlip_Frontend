import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from './Login.context';

export const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const { userInformation } = useContext(LoginContext);
  const [userType, setUserType] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (userInformation?.user?.id) {
          const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/users/${userInformation?.user?.id}`);
          const data = await response.json();
          const userdata = data.data.userType.type;
          setUserInfo(data.data);
          setUserType(userdata);
          localStorage.setItem('userType', userdata); // Store userType in localStorage
          console.log("User Type after fetch:", data.data.userType.type);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    }
    fetchData();
  }, [userInformation]);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType'); // Retrieve userType from localStorage
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const contextValues = {
    userType,
    setUserType,
    userInfo
  };

  return (
    <UserTypeContext.Provider value={contextValues}>
      {children}
    </UserTypeContext.Provider>
  );
};
