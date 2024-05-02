/* eslint-disable react/no-unescaped-entities */
import styles from "../../styles/Rent/OfferModal.module.css";
import conveyancer from "../../styles/Modals/ConveyancerModal.module.css";
// import { rentExclude, buyExclude, propertyType, furnished, addedToSite, rentMusthaves, buyMusthaves, rentShowOnly, buyShowOnly, buyInclude } from '../utils/filters';
// import { viewType } from '../utils/view_type';
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../styled components/Button";
import { NutlipCommission } from "./../Buyer Process/Commission";

// NOTE: THIS MODAL IS TO BE RE FACTORED

const OfferModal = (props) => {
  const [offer, setOffer] = useState("offer");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const success = () => {
    setOffer("success");
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

          {offer === "offer" && <Offer data={props.data} change={success} />}
          {offer === "success" && <Success change={offer}/>}
        </div>
      </div>
    </section>
  );
};

export const ConveyancerModal = (props) => {
  // const { showModal, setShowModal } = useContext(ConveyancerModalContext)

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
          {/* <div>
                        <span>wegeweg</span>
                    </div>
                    <div>
                        <hr/>
                        <span>OR</span>
                        <hr/>
                    </div> */}
          <div>
            <input type="text" placeholder="Add email address" />
            <Button
              bgcolor="#DA0025"
              textcolor="#FFF"
              width="30"
              content="Send"
            />
          </div>
          <div>
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div>
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

const Offer = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.offer}>
      <div className={styles.offerContainer}>
        <h1 className={styles.price}>£{props.data.price}</h1>

        <hr />

        <div className={styles.facilities}>
          <span>
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={24}
              height={24}
              alt="bedroom-thumbnail"
            />
            {props.data.facilities.bedrooms}
          </span>
          <span>
            <Image
              src="/images/mdi-shower.svg"
              width={24}
              height={24}
              alt="bathroom-thumbnail"
            />
            {props.data.facilities.bathrooms}
          </span>
          <span>
            <Image
              src="/images/material-symbols-chair-outline.svg"
              width={24}
              height={24}
              alt="livingroom-thumbnail"
            />
            {props.data.facilities.livingroom}
          </span>
        </div>

        <hr />

        <div className={styles.desc}>
          <h4>{props.data.desc}</h4>
          <p>{props.data.location}</p>
        </div>
      </div>

      <hr />

      <div className={styles.formInfoContainer}>
        <div className={styles.formOne}>
        <div className={styles.formInfo}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Full name"/>
        </div>

        <div className={styles.formInfo}>
          <label htmlFor="interested">
            Are you really interested in this property?
          </label>
        
            <div className={styles.radioContainer}>

            <div className={styles.radio} onClick={() => document.getElementById('Yes').click()}>
            <input type="radio" id="Yes" name="interested" value="Yes" />
            <label htmlFor="Yes">Yes</label>
            </div>
          
            <div className={styles.radio} onClick={() => document.getElementById('No').click()}>
            <input type="radio" id="No" name="interested" value="No" />
            <label htmlFor="No">No</label>
            </div>
         
            </div>
        </div>

        <div className={styles.formInfo}>
          <label htmlFor="offer">Nutlip Commission</label>
          <div className={styles.euroContainer}>
            <p>£</p>
            <input type="number" id="offer" />
          </div>
        </div>

        <div className={styles.formInfo}>
          <label htmlFor="paymentMethod">What’s your payment method?</label>
          <select id="paymentMethod" name="paymentMethod">
            <option value="" disabled selected>
              Select (Pay with cash, Mortgage, Crypto)
            </option>
            <option value="cash">Pay with cash</option>
            <option value="mortgage">Mortgage</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>
        </div>
        <div className={styles.formTwo}>
        <div className={styles.formInfo}>
          <label htmlFor="name">Address</label>
          <input type="text" id="name" placeholder="Address"/>
        </div>


        <div className={styles.formInfo}>
          <label htmlFor="priceoffer">Price offer</label>
          <div className={styles.euroContainer}>
            <p>£</p>
            <input type="number" id="priceoffer" />
          </div>
        </div>
        <div className={styles.formInfo}>
          <label htmlFor="receives">Agent/Seller receives</label>
          <div className={styles.euroContainer}>
            <p>£</p>
            <input type="number" id="receives" />
          </div>
        </div>

        <div className={styles.formInfo}>
          <label htmlFor="interested">
            What cryptocurrency
          </label>

          <div className={styles.radioContainer}>
          <div className={styles.radio}  onClick={() => document.getElementById('USDT').click()}>
            <input type="radio" id="USDT" name="interested" value="USDT" />
            <label htmlFor="USDT">USDT</label>
            </div>

            
            <div className={styles.radio}  onClick={() => document.getElementById('USDC').click()}>
            <input type="radio" id="USDC" name="interested" value="USDC" />
            <label htmlFor="USDC">USDC</label>
            </div>
          </div>
        </div>
       
        </div>
      </div>

      <section className={styles.btns}>
        <button>Cancel</button>
        <button onClick={() => props.change()}>Continue</button>
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
      Congratulations!! You’ve successfully made an offer on your preferred property. What’s next?
      </p>

      <div className={styles.SuccessButtonContainer}>
        <button>Need Conveyancer?</button>
        <button onClick={() => props.change()}>Go Back</button>
      </div>
    </div>
  );
};

export default OfferModal;
