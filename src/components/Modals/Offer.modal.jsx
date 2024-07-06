import styles from "../../styles/Rent/OfferModal.module.css";
import conveyancer from "../../styles/Modals/ConveyancerModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState,useEffect } from "react";
import Button from "../styled components/Button";
import { NutlipCommission } from "./../Buyer Process/Commission";
import { MakeAnOffer } from "../../context/MakeAnOffer.context";

// NOTE: THIS MODAL IS TO BE RE FACTORED

const OfferModal = (props) => {
  // const { form, handleChange } = useContext(MakeAnOffer);

  const [offer, setOffer] = useState("offer");

  const success = () => {
    setOffer("success");
  };

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
      apartmentId:props?.data._id,
      sellerId:props?.data.userId,
      userId: "",
        FullName:"",
        Address:"",
        Interested:"",
        offerPrice:"",
        NutlipCommission:"",
        receivedPayment:"",
        PaymentType:"",
        cryptoType:"",
        PriceOffer:""
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === "offerPrice") {
          const nutlipCommission = value * 0.005;
          const receivedPayment = value - nutlipCommission;
          const priceOffer = value;
          setForm({
            ...form,
            [name]: value,
            NutlipCommission: nutlipCommission.toFixed(2),
            receivedPayment: receivedPayment.toFixed(2),
            PriceOffer: priceOffer
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
    <section className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <section
            className={offer === "offer" ? styles.header : styles.header_two}
          >
            <h2>Make an Offer</h2>
            <button onClick={() => props.handleShow()}>
              <Image
                src="/images/vector-close.svg"
                width={15}
                height={15}
                alt="thumbnail"
              />
            </button>
          </section>

          {offer === "offer" && (
            <Offer
              form={form}
              handleChange={handleChange}
              change={success}
              data={props.data}
            />
          )}
          {offer === "success" && <Success />}
        </div>
      </div>
    </section>
  );
};

export const ConveyancerModal = (props) => {

  
  return (
    <div className={conveyancer.container}>
      <div className={conveyancer.inner_container}>
        <section className={styles.header}>
          <h2>Conveyancer Invite</h2>
          <button onClick={props.handler}>
            <Image
              src="/images/vector-close.svg"
              width={18}
              height={18}
              alt="thumbnail"
            />
          </button>
        </section>

        <section id={conveyancer.conveyancer}>
          
          <div className={conveyancer.inputField}>
            <input type="text" placeholder="Add email address" />
            <Button
              bgcolor="#DA0025"
              textcolor="#FFF"
              width="30"
              content="Send"
            />
          </div>

          <div id={conveyancer.Or}>
            <hr />
            <span>OR</span>
            <hr />
          </div>


          <div className={conveyancer.inputField}>
            <input type="text" placeholder="Add Conveyancer's Nutlip ID" />
            <Button
              bgcolor="#DA0025"
              textcolor="#FFF"
              width="30"
              content="Send"
            />
          </div>



        </section>
      </div>
    </div>
  );
};

const Offer = ({ change, form, handleChange, data }) => {

  const handleSubmit = async(event) => {
   
    event.preventDefault();
    console.log(form)
    try{
      const response = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        const responseData = await response.json(); 
        console.log("Response from API:", responseData);
        change();
      } else {
        console.error("API response was not ok", response);
        console.log(response.json());
      }
  
    }catch(error){
      console.error("Error occurred:", error);
    } 
    
  };


  return (
    <form className={styles.offer} onSubmit={handleSubmit}>
      <div className={styles.offerContainer}>
        <h1 className={styles.price}>£{data.Amount}</h1>

        <hr />

        <div className={styles.facilities}>
          <span>
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={24}
              height={24}
              alt="bedroom-thumbnail"
            />
            {data?.bedrooms}
          </span>
          <span>
            <Image
              src="/images/mdi-shower.svg"
              width={24}
              height={24}
              alt="bathroom-thumbnail"
            />
            {data?.bathrooms}
          </span>
          <span>
            <Image
              src="/images/material-symbols-chair-outline.svg"
              width={24}
              height={24}
              alt="livingroom-thumbnail"
            />
            {data?.LivingRoom}
          </span>

          <span>
            <img
              src="https://img.icons8.com/ios/50/toilet-bowl.png"
              width={25}
              height={25}
              alt="toilet-bowl"
            />
            {data.Toilets}
          </span>
        </div>

        <hr />

        <div className={styles.desc}>
          <h4>{data.Title}</h4>
          <p>{data.location}</p>
        </div>
      </div>

      <hr />

      <div className={styles.formInfoContainer}>
        <div className={styles.formOne}>
          <div className={styles.formInfo}>
            <label htmlFor="FullName">Full Name</label>
            <input type="text" id="FullName" name="FullName" placeholder="Fullname" value={form.FullName} onChange={handleChange} />
          </div>

          <div className={styles.formInfo}>
            <label htmlFor="interested">
              Are you really interested in this property?
            </label>

            <div className={styles.radioContainer}>
              <div
                className={styles.radio}

              >
                <input type="radio" id="Yes" name="Interested" value="Yes" onChange={handleChange} checked={form.Interested === true} />                 <label htmlFor="Yes">Yes</label>
              </div>

              <div
                className={styles.radio}

              >
                <input type="radio" id="No" name="Interested" value="No" onChange={handleChange} checked={form.Interested === false} />
                <label htmlFor="No">No</label>
              </div>
            </div>
          </div>

          <div className={styles.formInfo}>
            <label htmlFor="offer">{"Nutlip Commission (0.5%)"}</label>
            <div className={styles.euroContainer}>
              <p>£</p>
              <input type="number" id="offer" name="NutlipCommission" disabled value={form.NutlipCommission} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.formInfo}>
            <label htmlFor="PaymentType">What’s your payment method?</label>
            <select id="PaymentType" name="PaymentType" value={form.PaymentType} onChange={handleChange}>
              <option value="" disabled selected>
                Select (Pay with cash, Mortgage, Crypto)
              </option>
              <option name="cash" value="cash">Pay with cash</option>
              <option name="mortgage" value="mortgage">Mortgage</option>
              <option name="crypto" value="crypto">Crypto</option>
            </select>
          </div>
        </div>
        <div className={styles.formTwo}>
          <div className={styles.formInfo}>
            <label htmlFor="name">Address</label>
            <input type="text" id="address" name="Address" placeholder="Address" value={form.Address} onChange={handleChange} />
          </div>

          <div className={styles.formInfo}>
            <label htmlFor="offerPrice">Price offer</label>
            <div className={styles.euroContainer}>
              <p>£</p>
              <input type="number" name="offerPrice" id="offerPrice" value={form.offerPrice} onChange={handleChange} />
            </div>
          </div>
          <div className={styles.formInfo}>
            <label htmlFor="receives">Agent/Seller receives</label>
            <div className={styles.euroContainer}>
              <p>£</p>
              <input type="number" id="receivedPayment" name="receivedPayment" value={form.receivedPayment} onChange={handleChange} disabled/>
            </div>
          </div>

          <div className={styles.formInfo}>
            <label htmlFor="interested">What cryptocurrency</label>

            <div className={styles.radioContainer}>
              <div
                className={styles.radio}
              >
                <input type="radio" id="USDT" name="cryptoType" value="USDT" onChange={handleChange} checked={form.cryptoType === "USDT"} />                <label htmlFor="USDT">USDT</label>
              </div>

              <div
                className={styles.radio}
              >
                <input type="radio" id="USDC" name="cryptoType" value="USDC" onChange={handleChange} checked={form.cryptoType === "USDC"} />                <label htmlFor="USDC">USDC</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.btns}>
        <button>Cancel</button>
        <button type="submit">Continue</button>
      </section>
    </form>
  );
};

export const Success = (props) => {
  const router = useRouter();
  return (
    <div className={styles.success}>
      <Image src="/modal/success.svg" width={200} height={150} alt="success" />

      <h2>Successful</h2>

      <p>
        Congratulations!! You’ve successfully made an offer on your preferred
        property. What’s next?
      </p>

      <div className={styles.SuccessButtonContainer}>
        <button>Need Conveyancer?</button>
        <button onClick={() => props.change()}>Go Back</button>
      </div>
    </div>
  );
};

export default OfferModal;
