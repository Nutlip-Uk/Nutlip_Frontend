import styles from "../../../styles/Transactions/inProgress.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const Current = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchAcceptedOffer = async () => {
      const userInformation = JSON.parse(localStorage.getItem("userInformation"));
      const userId = userInformation.user.id;
      setUserId(userId);

      try {
        const response = await fetch(`https://nutlip-backend-yhfz.onrender.com/api/offer/getofferssent/${userId}`);
        const data = await response.json();
        console.log('API response:', data);

        if (Array.isArray(data.offers)) {
          const acceptedOffers = data.offers.filter(offer => offer.status === "accepted");
          console.log('Accepted offers:', acceptedOffers);

          const fetchAdditionalData = acceptedOffers.map(async (offer) => {
            const additionalResponse = await fetch(`https://nutlip-backend-yhfz.onrender.com/api/apartments/getapartment/${offer.apartmentId}`);
            const additionalData = await additionalResponse.json();
            console.log('Additional data:', additionalData);
            return {
              ...offer,
              apartmentDetails: additionalData.data,
            };
          });

          const offersWithDetails = await Promise.all(fetchAdditionalData);
          console.log('Offers with details:', offersWithDetails);
          setOffers(offersWithDetails);
          console.log('Offers:', offers);
        } else {
          console.error('Expected an array but got:', data.offers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAcceptedOffer();
  }, []);

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href="/transactions" className={styles.Header}><h2>In-progress</h2></Link>
        <div className={styles.ListContainer}>
          {offers.map((offer, index) => (
            <div key={index} className={styles.ListBox} onClick={() => router.push(`/transactions/current/${offer.transaction_id}`)}>
              <span className={styles.ListingId}>Transaction ID: {offer.transaction_id.slice(0, 5)}</span>
              <h4 className={styles.ListPrice}>£ {offer.apartmentDetails?.Amount}</h4>
              <p className={styles.Desc}>{offer.apartmentDetails?.Title || "No description"}</p>
              <p className={styles.Location}>{offer.apartmentDetails?.location || "No location"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Current;
