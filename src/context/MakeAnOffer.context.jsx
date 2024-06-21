import { createContext, useState } from "react";

export const MakeAnOffer = createContext(null)

export const MakeAnOfferProvider = ({ children }) => {
    const [form, setForm] = useState({
        fullName:"",
        Address:"",
        interest:"",
        priceOffer:"",
        NutlipCommission:"",
        AgentSellerReceives:"",
        PaymentMethod:"",
        cryptoType:""
      });

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }

    return (
        <MakeAnOffer.Provider value={{form , handleChange}}>
        {children}
        </MakeAnOffer.Provider>
    )
}
