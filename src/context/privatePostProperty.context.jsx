import { createContext, useState } from "react";

export const PrivatePostContext = createContext(null)

export const PrivatePostPropertyContextProvider = ({ children }) => {
    const [form, setForm] = useState({
        Title: '',
        purpose: '',
        propertyType: '',
        subPropertyType: '',
        bathrooms: '',
        bedrooms: '',
        toilets: '',
        stateOfProperty: '',
        size: '',
        location: '',
        address: '',
        landmark: '',
        radius: '',
        amount: '',
        minimumOffer: '',
        currency: '',
        description: '',
        videoLink: '',
        virtualTourLink: '',
        yearBuilt:'',
        appliances:'',
        basement:'',
        floorCovering:'',
        rooms:'',
        utilityTypes:'',
        heatingType:'',
        heatingFuel:'',
        phoneNumber:'',
        addFeatures:[],
        email:"",
        images: []  
      });

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }

    return (
        <PrivatePostContext.Provider value={{form , handleChange}}>
        {children}
        </PrivatePostContext.Provider>
    )
}
