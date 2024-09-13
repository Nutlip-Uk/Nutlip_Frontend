import React, { useEffect, useState } from "react";
import styles from "../../../styles/Transactions/OffersSent.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const OffersSent = () => {
  const [offers, setOffers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSentOffers = async () => {
      const userInformation = JSON.parse(
        localStorage.getItem("userInformation")
      );
      const userId = userInformation.user.id;

      try {
        const response = await fetch(
          `https://nutlip-backend-wdsi.onrender.com/api/offer/getofferssent/${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          return data.offers; // Return the offers data here
        } else {
          console.error("Failed to fetch offers");
          return []; // Return an empty array in case of error
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of error
      }
    };

    const fetchApartments = async (offersData) => {
      const updatedOffers = await Promise.all(
        offersData.map(async (offer) => {
          const response = await fetch(
            `https://nutlip-backend-wdsi.onrender.com/api/apartments/getapartment/${offer.apartmentId}`
          );
          if (response.ok) {
            const apartmentData = await response.json();
            return { ...offer, apartment: apartmentData.data };
          } else {
            return offer; // Return the offer as is if apartment data fetch fails
          }
        })
      );
      setOffers(updatedOffers);
    };

    const fetchAllData = async () => {
      const offersData = await fetchSentOffers();
      if (offersData.length > 0) {
        await fetchApartments(offersData);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href={"/transactions"} className={styles.Header}>
          <h2>Offers Sent</h2>
        </Link>
        {offers.length > 0 && (
          <div className={styles.ListContainer}>
            {offers.map((offer) => (
              <div
                key={offer._id}
                className={styles.ListBox}
                onClick={() =>
                  router.push(`/transactions/offerssent/${offer.apartmentId}`)
                }
              >
                <span className={styles.ListingId}>
                  Offer ID: {offer._id.slice(0, 8)}
                </span>
                <h4 className={styles.ListPrice}>£ {offer?.PriceOffer}</h4>
                <div className={styles.status}>
                  Status :{" "}
                  <span
                    style={
                      offer.status === "accepted"
                        ? { background: "#00712D", color: "white" }
                        : offer.status === "cancelled"
                        ? { background: "#FF0000", color: "white" }
                        : offer.status === "on hold"
                        ? { background: "#FFA500", color: "white" }
                        : offer.status === "pending"
                        ? { background: "#F9E400", color: "black" }
                        : {}
                    }
                  >
                    {offer?.status}
                  </span>
                </div>
                <p>{offer?.apartment?.Title || "Apartment Title"}</p>
                <p>{offer?.apartment?.address || "Apartment Address"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersSent;
