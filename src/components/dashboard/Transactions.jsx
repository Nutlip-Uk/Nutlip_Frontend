import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "../../styles/dashboard/transaction.module.css";
const Transactions = () => {
  const router = useRouter();
  const data = router.query;

  const [type, setType] = useState("transaction");

  let allListing = "allListing";
  let recentlyAdded = "recentlyAdded";
  let featured = "featured";

  const handleChange = (newType) => {
    setType(newType);
  };

  const count = useRef(1);
  const [update, setUpdate] = useState(false);

  const next = () => {
    if (count.current <= 4) {
      count.current = count.current + 1;
      setUpdate(!update); // Trigger a re-render
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
      setUpdate(!update);
    }
  };

  return (
    <>
      <div className={styles.Section}>
        {type === "transaction" && (
          <MainTransaction handleChange={handleChange} />
        )}
        {type === "offers" && <Offers handleChange={handleChange} />}
        {type === "ongoing" && <Ongoing />}
        {type === "offerReceived" && (
          <OfferReceived handleChange={handleChange} />
        )}
        {type === "viewOffers" && <ViewOffers handleChange={handleChange} />}
      </div>
    </>
  );
};

export default Transactions;

const MainTransaction = ({ handleChange }) => {
  return (
    <>
      <div className={styles.NavContainer}>
        <h1 className={styles.Header}>Transaction</h1>

        <div className={styles.search}>
          <input type="text" placeHolder="search property" />
          <img src="/navbar/search.svg" />
        </div>
      </div>

      <div className={styles.TransactionsContainer}>
        <div className={styles.Box} onClick={() => handleChange("offers")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Ongoing transactions</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/check.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Completed transactions</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/cancel.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Cancelled transactions</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
      </div>
    </>
  );
};

const Offers = ({ handleChange }) => {
 

  return (
    <>
      <div className={styles.NavContainer}>
        <h1
          onClick={() => handleChange("transaction")}
          className={styles.Header}
        >
          {"< Offers"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeHolder="search property" />
          <img src="/navbar/search.svg" />
        </div>
      </div>

      <div className={styles.TransactionsContainer}>
        <div
          className={styles.Box}
          onClick={() => handleChange("offerReceived")}
        >
          <img src="/dashboard/receive.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers received</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/accepted.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers Accepted</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/hold.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers on hold</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/cancel.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers declined</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
      </div>
    </>
  );
};

const OfferReceived = ({ handleChange }) => {

  const [apartments, setApartments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    console.log("userInformation:", userInformation);

    if (userInformation && userInformation.user) {
      const userId = userInformation.user.id;
      setUserId(userId);
      console.log("userId:", userId);

      const fetchData = async () => {
        try {
          const response = await fetch(`/api/apartments/${userId}`);
          const data = await response.json();
          setApartments(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      };

      fetchData();
    }
  }, []);



  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={() => handleChange("offers")} className={styles.Header}>
          {"< Offers received"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeHolder="search property" />
          <img src="/navbar/search.svg" />
        </div>
      </div>

        <div className={styles.propertyList}>
        {apartments.map((apartment) => (
      <div key={apartment?._id} className={styles.propertyContainer}>
          <div className={styles.Property}>
            <div className={styles.PropertyImg}>
              <img src={apartment?.images[0]} alt={apartment?.Title} />

              <div className={styles.propertyText}>
                <p>{apartment?.Title || "Title N/A"}</p>
                <p>{apartment?.address || "Address N/A"}</p>

                <p>{`Last updated: ${new Date(apartment?.date_created).toLocaleDateString()}`}</p>
              </div>
            </div>

            <hr />

            <div className={styles.PropertyInfo}>
              <p>{apartment._id ? `Listing ID: ${apartment?._id.slice(4)}` : 'Listing ID: N/A'}</p>
              <p>{`£ ${apartment?.Amount}`}</p>
              <p>{`Status: ${apartment.status || "Available"}`}</p>
            </div>

            <hr />

          </div>
      </div>
        ))}
            <button className={styles.viewOffer} onClick={() => handleChange("viewOffers")}>
              <p>View offers</p>
            </button>
        </div>
    </>
  );
};
const ViewOffers = ({ handleChange }) => {

  const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    console.log("userInformation:", userInformation);

    if (userInformation && userInformation.user) {
      const userId = userInformation.user.id;
      setUserId(userId);
      console.log("userId:", userId);

      const fetchData = async () => {
        try {
          const response = await fetch(`/api/offer/getuseroffers/${userId}`);
          const data = await response.json();
          setOffers(data.offers);
          console.log(data.offers)
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <div className={styles.NavContainer}>
        <h1
          onClick={() => handleChange("offerReceived")}
          className={styles.NavBack}
        >
          {"< Back"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeHolder="search property" />
          <img src="/navbar/search.svg" />
        </div>
      </div>

      <div className={styles.viewOfferContainer}>
        <div className={styles.Property}>
          <div className={styles.actualPrice}>
            <p>Actual price</p>
            <p>£706,000</p>
          </div>

          <hr />

          <div className={styles.offered}>
            <p>Offer</p>
            <p>£806,000</p>
            <p>Offer Detail</p>
          </div>

          <hr />

          <div className={styles.offerContact}>
            <img src="/dashboard/call.svg" />
            <img src="/dashboard/whatsapp.svg" />
            <img src="/dashboard/message.svg" />
          </div>

          <hr />

          <div className={styles.decision}>
            <button>Accept</button>
            <button>Hold</button>
            <button>Decline</button>
          </div>
        </div>
      </div>
    </>
  );
};
const Ongoing = () => {
  return (
    <>
      <h1>Ongoing</h1>
    </>
  );
};
