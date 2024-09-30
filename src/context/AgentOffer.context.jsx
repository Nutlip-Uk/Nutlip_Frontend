import { createContext, useState } from "react";

export const AgentOfferContext = createContext(null)

export const AgentOfferContextProvider = ({ children }) => {
    const [acceptOffer, setAcceptOffer] = useState('')
    // const closeModal = () => {
    //     setAcceptOffer(!acceptOffer)
    // }
    // const openModal = () => {
    //     setAcceptOffer(!acceptOffer)
    // }

    return (
        <AgentOfferContext.Provider value={{acceptOffer, setAcceptOffer}}>
        {children}
        </AgentOfferContext.Provider>
    )
}
