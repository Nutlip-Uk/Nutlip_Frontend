import { createContext, useState, useEffect } from "react";

export const MakeAnOffer = createContext(null)

export const MakeAnOfferProvider = ({ children }) => {
  useEffect(() => {
    // Retrieve the userInformation from the local storage
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    console.log("userInformation:", userInformation);

    if (userInformation && userInformation.user) {
      // Extract the userId from the userInformation object
      const userId = userInformation.user.id;
      console.log("userId:", userId);
      if (userId) {
        setForm((prevForm) => ({ ...prevForm, userId }));
      }
    }
  }, []);
  const [form, setForm] = useState({
    apartmentId: "",
    userId: "",
    FullName: "",
    Address: "",
    Interested: "",
    PriceOffer: "",
    NutlipCommission: "",
    receivedPayment: "",
    PaymentType: "",
    cryptoType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "PriceOffer") {
      const nutlipCommission = value * 0.005;
      const receivedPayment = value - nutlipCommission;
      setForm({
        ...form,
        [name]: value,
        NutlipCommission: nutlipCommission.toFixed(2),
        receivedPayment: receivedPayment.toFixed(2)
      });
    } else if (name === "Interested") {
      setForm({
        ...form,
        [name]: value === "Yes" ? true : false,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  return (
    <MakeAnOffer.Provider value={{ form, handleChange }}>
      {children}
    </MakeAnOffer.Provider>
  )
}
