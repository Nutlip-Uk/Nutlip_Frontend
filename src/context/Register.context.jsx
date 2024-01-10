import { createContext, useState } from "react";

export const RegistrationContext = createContext(null)

export const RegistrationContextProvider = ({ children }) => {
    const [regType, setRegType] = useState('signup')

    return (
        <RegistrationContext.Provider value={{regType, setRegType}}>
        {children}
        </RegistrationContext.Provider>
    )
}
