import styles from "../../styles/Rent/OfferModal.module.css";
import conveyancer from "../../styles/Modals/ConveyancerModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import Button from "../styled components/Button";
import Link from "next/link";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { ModalDialog } from "@mui/joy";
import { LoginContext } from "../../context/Login.context";
import { UserTypeContext } from "../../context/UserType.context";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


// NOTE: THIS MODAL IS TO BE RE FACTORED

const OfferModal = (props) => {
  // const { form, handleChange } = useContext(MakeAnOffer);

  const [offer, setOffer] = useState("offer");

  const success = () => {
    setOffer("success");
  };

  const userInformation = JSON.parse(localStorage.getItem("userInformation"));

  useEffect(() => {
    if (!userInformation || !userInformation.user) {
      console.log("userInformation is not available or invalid:", userInformation);
    } else {
      console.log("userInformation is available:", userInformation);
      const userId = userInformation.user.id;
      setForm((prevForm) => ({ ...prevForm, userId }));
    }
  }, [userInformation]);

  const [form, setForm] = useState({
    apartmentId: props?.data._id,
    sellerId: props?.data.userId,
    userId: "",
    FullName: "",
    Address: "",
    Interested: "",
    PriceOffer: "",
    NutlipCommission: "",
    receivedPayment: "",
    PaymentType: "",
    PriceOffer: "",
    cryptoType: "Bitcoin",

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

  const { isUserLoggedIn } = useContext(LoginContext)
  const { userType } = useContext(UserTypeContext)

  const isLoggedIn = userInformation && userInformation.user;

  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <div className={`${styles.inner_container} py-5`} >
          <section className={offer === "offer" ? styles.header : styles.header_two}>
            {userType == "property_seeker" ? <h2 className="text-2xl font-bold">Make an Offer</h2> : (<p className="text-2xl font-bold opacity-0">.</p>)}
            <button onClick={() => props.handleShow()}>
              <Image
                src="/images/vector-close.svg"
                width={15}
                height={15}
                alt="thumbnail"
              />
            </button>
          </section>
          {
            offer === "offer" && (
              userType == "property_seeker" ? (
                <Offer
                  form={form}
                  handleChange={handleChange}
                  change={success}
                  data={props.data}
                  handleShow={props.handleShow}
                  userInformation={userInformation}
                />
              ) : (
                <>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-xl italic text-neutral-600">Login as a property seeker to make an offer...</p>
                  </div>
                </>
              )
            )
          }
          {offer === "success" && <Success />}
        </div>
      </div>
    </section>
  );
};


export const ConveyancerModal = (props) => {

  const { handler, addSellerConveyancer, addBuyerConveyancer, userType } = props

  const [conveyancerID, setConveyancerID] = useState("");
  const [conveyancerEmail, setConveyancerEmail] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "conveyancerID") {
      setConveyancerID(value);
    } else if (name === "conveyancerEmail") {
      setConveyancerEmail(value);
    }
  };

  return (
    <div className={conveyancer.container}>
      <div className={conveyancer.inner_container}>
        <section className={styles.header}>
          <h2>Conveyancer Invite</h2>
          <button onClick={handler}>
            <Image
              src="/images/vector-close.svg"
              width={18}
              height={18}
              alt="thumbnail"
            />
          </button>
        </section>

        <section id={conveyancer.conveyancer}>

          <form className={conveyancer.inputField}>
            <input disabled type="text" placeholder="Add email address" name="conveyancerEmail" value={conveyancerEmail} onChange={handleChange} />
            <Button
              bgcolor="#DA0025"
              textcolor="#FFF"
              width="30"
              content="Send"
              disabled
            />
          </form>

          <div id={conveyancer.Or}>
            <hr />
            <span>OR</span>
            <hr />
          </div>


          <form onSubmit={(e) => {
            e.preventDefault();
            userType === "property_seeker"
              ? addBuyerConveyancer(conveyancerID)
              : addSellerConveyancer(conveyancerID);
          }}

            className={conveyancer.inputField}>
            <input type="text" placeholder="Add Conveyancer's Nutlip ID" name="conveyancerID" value={conveyancerID} onChange={handleChange} />
            <Button
              bgcolor="#DA0025"
              textcolor="#FFF"
              width="30"
              content="Send"
              type="submit"
            />
          </form>



        </section>
      </div>
    </div>
  );
};

const Offer = ({ change, form, handleChange, data, userInformation, handleShow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);

    // Check if the offered price is less than the minimum offer
    if (form.PriceOffer < data.Minimum_offer) {
      setIsModalOpen(true);
      return;// Stop the submission if the offer is too low
    }

    try {
      const response = await fetch('https://nutlip-server.uc.r.appspot.com/api/offer/createoffer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response from API:", responseData);
        change(); // Call the change function after successful submission
      } else {
        console.error("Failed to submit the offer:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };


  return (
    <>
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

          <div className={`${styles.desc} width-full line-clamp-1`}>
            <h4 className="line-clamp-1  font-medium">{data.Title.slice(0, 25)}...</h4>
            <p className="line-clamp-1">{data.location[1]}</p>
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
              <select className="bg-white" id="PaymentType" name="PaymentType" value={form.PaymentType} onChange={handleChange}>
                <option value="" disabled selected>
                  Select (Pay with cash, Mortgage)
                </option>
                <option name="Cash" value="Cash">Cash</option>
                <option name="mortgage" value="mortgage">Mortgage</option>
                {/* <option name="crypto" value="crypto">Crypto</option> */}
              </select>
            </div>
          </div>
          <div className={styles.formTwo}>
            <div className={styles.formInfo}>

              <label>
                Address
              </label>
              <Autocomplete
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
              />

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
                <input type="number" id="receivedPayment" name="receivedPayment" value={form.receivedPayment} onChange={handleChange} disabled />
              </div>
            </div>

            {/* <div className={styles.formInfo}>
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
          </div> */}
          </div>
        </div>

        <section className={styles.btns}>
          <button onClick={() => handleShow()}>Cancel</button>
          <button type="submit">Continue</button>
        </section>
      </form>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

      >
        <ModalDialog
          color="danger"
          variant="outlined"
        >

          <ModalClose variant="plain" sx={{ m: 1 }} onClick={() => setIsModalOpen(false)} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="#C7253E"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            Offer too low
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Your offered price is lower than the minimum price placed by the seller. Please increase your offer.
          </Typography>

        </ModalDialog>
      </Modal>
    </>
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
        <Link href="/conveyancer">Need Conveyancer?</Link>
        <Link href={"/buy/search"}>Go Back</Link>
      </div>
    </div>
  );
};


export const Autocomplete = ({ value: inputValue, onChange, name, placeholder, ...props }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: `intimap`,
    requestOptions: {
      // Define search scope here if needed
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    const inputVal = e.target.value;
    setValue(inputVal);  // Update internal state
    if (onChange) {
      onChange(e);  // Notify parent about the input change
    }
  };

  const handleSelect = (suggestion) => {
    const selectedValue = suggestion.description;

    // Set the selected value in the internal state and notify parent
    setValue(selectedValue, false);  // Prevent further autocomplete requests
    clearSuggestions();  // Close the suggestions dropdown

    // Geocode to get lat and lng (optional step)
    getGeocode({ address: selectedValue }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
    });

    // Notify the parent to update the form
    if (onChange) {
      onChange({ target: { name, value: selectedValue } });  // Include name and value for form updates
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={`text-lg text-neutral-700`}
          onClick={() => handleSelect(suggestion)}
        >
          <strong className="font-medium">{main_text}</strong> <small className="italic text-neutral-500 text-xs">{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className={styles.inputContainer}>
      <input
        name={name}  // Ensure the name is passed to the input field
        value={inputValue}  // Controlled input
        onChange={handleInput}  // Handle input and pass changes to parent
        disabled={!ready}
        placeholder={placeholder}
        {...props}  // Spread other props if any
      />
      {status === "OK" && (
        <ul className={`absolute bg-white w-full z-10 shadow-xl p-4 rounded-lg  border border-neutral-200 flex flex-col gap-2`}>
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default OfferModal;
