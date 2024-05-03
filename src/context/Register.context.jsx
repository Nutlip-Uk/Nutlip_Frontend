import { createContext, useState, useContext, useEffect } from "react";

export const RegistrationContext = createContext(null);

export const RegistrationContextProvider = ({ children }) => {
  const [regType, setRegType] = useState("signup");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
    password: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    country: "",
    city: "",
    postcode: "",
    address1: "",
    address2: "",
    website: "",
    companyNumber: "",
    phone: "",
    mobile: "",
    businessName:"",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [userInformation, setUserInformation] = useState(null);
  const [isUserFirstTime , setIsUserFirstTime]= useState(false);

  const updateFormData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    return passwordRegex.test(formData.password);
  };

  useEffect(() => {
    // Code to run after userInformation is updated
    console.log("User information changed:", userInformation);
  }, [userInformation]);

  return (
    <RegistrationContext.Provider
      value={{
        regType,
        setRegType,
        formData,
        updateFormData,
        isPasswordValid,
        validatePassword,
        setUserInformation,
        userInformation,
        setIsPasswordValid,
        setFormData,
        isUserFirstTime , 
        setIsUserFirstTime
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
