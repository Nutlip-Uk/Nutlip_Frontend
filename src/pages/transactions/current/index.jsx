import styles from "../../../styles/Transactions/inProgress.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const Current = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [offers, setOffers] = useState([]);
  const [transactionContent, setTransactionContent] = useState({});

  useEffect(() => {
    const fetchAcceptedOffer = async () => {
      const userInformation = JSON.parse(localStorage.getItem("userInformation"));
      const userId = userInformation?.user?.id;
      setUserId(userId);

      try {
        const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/offer/getofferssent/${userId}`);
        const data = await response.json();
        console.log('API response:', data);

        if (Array.isArray(data.offers)) {
          const acceptedOffers = data.offers.filter(offer => offer.status === "accepted");
          console.log('Accepted offers:', acceptedOffers);

          const fetchAdditionalData = acceptedOffers.map(async (offer) => {
            const additionalResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${offer.apartmentId}`);
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

        } else {
          console.error('Expected an array but got:', data.offers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAcceptedOffer();
  }, []);

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      if (offers.length > 0) {
        const fetchTransactionDetails = offers.map(async (offer) => {
          const txcontent = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/gettransaction/${offer?.transaction_id}`);
          const data = await txcontent.json();
          const transactionContentData = data.transaction;


          // Store transaction content per transaction_id
          return {
            ...offer,
            transactionContent: transactionContentData
          };
        });

        const offersWithTransactionContent = await Promise.all(fetchTransactionDetails);
        setOffers(offersWithTransactionContent);

      }
    };

    fetchTransactionInfo();
  }, [offers]);

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href="/transactions" className={styles.Header}><h2>In-progress</h2></Link>
        <div className={styles.ListContainer}>
          {offers.map((offer, index) => (
            <div key={index} className={styles.ListBox} onClick={() => router.push(`/transactions/current/${offer.transaction_id}`)}>
              <span className={styles.ListingId}>Transaction ID: {offer.transaction_id.slice(0, 5)}</span>
              <h4 className={styles.ListPrice}>£ {offer?.apartmentDetails?.Amount}</h4>
              <p className={`${styles.Desc} line-clamp-4 text-sm`}>{offer?.apartmentDetails?.Title || "No description"}</p>
              <p className={`${styles.Location} line-clamp-5`}>{offer?.apartmentDetails?.location[1] || "No location"}</p>
              <p className="text-xs text-gray-900 font-normal">Transaction Stage: {offer?.transactionContent?.transactionCurrentStage || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Current;