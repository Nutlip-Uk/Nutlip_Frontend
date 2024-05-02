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

      <div className={styles.propertyContainer}>
        <div className={styles.Property}>
          <div className={styles.PropertyImg}>
            <img src="/dashboard/listimg.png" />

            <div className={styles.propertyText}>
              <p>3 bedroom flat for sale</p>
              <p>Navino road, London E8</p>

              <p>Last updated: 12th June, 2023</p>
            </div>
          </div>

          <hr />

          <div className={styles.PropertyInfo}>
            <p>Listing ID: WYE12</p>
            <p>£706,000</p>
            <p>status : Available</p>
          </div>

          <hr />

          <button className={styles.viewOffer} onClick={() => handleChange("viewOffers")}>
            View offers
          </button>
        </div>
      </div>
    </>
  );
};
const ViewOffers = ({ handleChange }) => {
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
