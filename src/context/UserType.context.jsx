import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from './Login.context';

export const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const { userInformation } = useContext(LoginContext) || {}; // Add a default empty object if LoginContext is undefined
  const [userType, setUserType] = useState('');

  useEffect(() => {
    console.log("userInformation", userInformation?.user?.id);
    async function fetchData() {
      if (userInformation?.user?.id) {
        try {
          const response = await fetch(`https://nutlip-backend.onrender.com/api/users/${userInformation.user.id}`);
          const data = await response.json();
          console.log("Data", data);
          setUserType(data?.userType?.type);
          console.log("User Type", data.userType);
        } catch (error) {
          console.error("Error fetching user type:", error);
        }
      }
    }
    fetchData();
  }, [userInformation, userType]);

  const contextValues = {
    userType,
    setUserType,
  };

  return (
    <UserTypeContext.Provider value={contextValues}>
      {children}
    </UserTypeContext.Provider>
  );
};
