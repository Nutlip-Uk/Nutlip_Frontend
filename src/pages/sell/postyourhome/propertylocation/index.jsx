import { useState } from "react";
import { router } from "next/router";
import styles from "../../../../styles/sell/propertylocation.module.css";

function PropertyLocation() {

  const [address, setAddress] = useState("Current Address: 11 Stanley Road London NW90 4YH");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmClick = () => {
    setConfirmed(true);
  }

  const handleEditClick = () => {
    setAddress("New  Address"); // Update address
    setConfirmed(false); // Set confirmed back to false
  }

  const handleSave = (e) => {
    e.preventDefault();
    router.push("/sell/postyourhome/propertylocation/postproperty")
  };

  return (
    <>
      <section className={styles.Section}>
          <div className={styles.mapContainer}>
            <img src="/sell/map.png" />
          </div>
        <div className={styles.Container}>

          <div className={styles.infoContainer}>
            <p className={styles.address}>{address}</p>

            {confirmed ? null : (
              <div className={styles.accurateLocation}>
                <p>{"Is this an accurate location of your house?"}</p>

                <div className={styles.buttonContainer}>
                  <button onClick={handleConfirmClick}>
                    {"Yes, it's the correct location"}
                  </button>
                  <button onClick={handleEditClick}>
                    {"No, let me change it"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.setPriceContainer}>
              <p className={styles.setPriceHeader}>Set your price</p>

              <div className={styles.setPriceInputContainer}>
              <label>
                Amount
                <input type="text" placeholder="Amount"/>
              </label>

              <label>
                Minimum Offer
                <input type="text" placeholder="Amount"/>
              </label>

              <label>
                Currency
                <select>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>


              <div className={styles.saveContainer}>
                <button>Cancel</button>
                <button onClick={handleSave}>{"Save & Continue"}</button>
              </div>


              </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PropertyLocation;
