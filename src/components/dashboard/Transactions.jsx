import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "../../styles/dashboard/transaction.module.css";
const Transactions = () => {
  const router = useRouter();
  const data = router.query;

  const [type, setType] = useState("transaction");
  const [apartments, setApartments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [selectedApartmentAmount, setSelectedApartmentAmount] = useState(null);
  const [offers, setOffers] = useState([]);



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


  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    console.log("userInformation:", userInformation);

    if (userInformation && userInformation.user) {
      const userId = userInformation.user.id;
      setUserId(userId);
      console.log("userId:", userId);

      const fetchApartmentsData = async () => {
        try {
          const response = await fetch(`/api/apartments/${userId}`);
          const data = await response.json();
          setApartments(data);
          console.log("Apartment data", data);
        } catch (error) {
          console.error("Error fetching apartments:", error);
        }
      };

      const fetchOffersReceived = async () => {
        try {
          const response = await fetch(`/api/offer/getoffersreceived/${userId}`);
          const data = await response.json();
          setOffers(data);
          console.log("offers received:", data);
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      }

      const fetchOfferSent = async () => {
        try {
          const response = await fetch(`/api/offer/getofferssent/${userId}`);
          const data = await response.json();
          setOffers(data);
          console.log("offers Sent:", data);
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
     
      }
      
      fetchOffersReceived();
      fetchApartmentsData();
      fetchOfferSent();
    }
  }, []);

  useEffect(() => {
    console.log("selectedApartmentId:", selectedApartmentId);
    
    if (selectedApartmentId) {
      const fetchPropertyOffers = async () => {
        try {
          const response = await fetch(`/api/offer/getpropertyoffers/${selectedApartmentId}`);
          const data = await response.json();
          setOffers(data.offers);
          console.log("Property offers:", data.offers);
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      };

      fetchPropertyOffers();
    }
  }, [selectedApartmentId]);

  const handleViewOffers = (apartmentId, apartmentAmount) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);
    handleChange("viewOffers"); 
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
          <OfferReceived
            handleViewOffers={handleViewOffers}
            selectedApartmentId={selectedApartmentId}
            apartments={apartments}
            userId={userId}
            handleChange={handleChange}
          />
        )}
        {type === "viewOffers" && (
          <ViewOffers
            userId={userId}
            offers={offers}
            selectedApartmentId={selectedApartmentId}
            selectedApartmentAmount={selectedApartmentAmount}
            handleChange={handleChange}
          />
        )}
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
          <input type="text" placeholder="search property" />
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
          <input type="text" placeholder="search property" />
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

const OfferReceived = ({ handleChange, userId, apartments, handleViewOffers, selectedApartmentId }) => {




  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={() => handleChange("offers")} className={styles.Header}>
          {"< Offers received"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeholder="search property" />
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
                <p> Listing ID: {apartment._id ? apartment?._id.slice(-6) : ' N/A' }</p>
                <p>{`£ ${apartment?.Amount}`}</p>
                <p>{`Status: ${apartment.status || "Available"}`}</p>
              </div>

              <hr />

              <button className={styles.viewOffer} onClick={() => handleViewOffers(apartment._id,apartment.Amount)}>
                <p>View offers</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
const ViewOffers = ({ handleChange, offers=[],selectedApartmentAmount  }) => {
  const [offerStatuses, setOfferStatuses] = useState({});

  const handleButtonClick = (index, status) => {
    setOfferStatuses(prevStatuses => ({
      ...prevStatuses,
      [index]: status
    }));
  };

  const validStatuses = ['accepted', 'on hold', 'declined'];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'accepted':
        return { color: 'green' };
      case 'declined':
        return { color: 'red' };
      case 'on hold':
        return { color: 'blue' };
      default:
        return {};
    }
  };

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
          <input type="text" placeholder="search property" />
          <img src="/navbar/search.svg" alt="search" />
        </div>
      </div>

       <div className={styles.viewOfferListing}>
       {Array.isArray(offers) && offers.map((offer, index) => (
      <div className={styles.viewOfferContainer}>
          <div key={index} className={styles.Offer}>
            <div className={styles.actualPrice}>
              <p>Actual price</p>
              <p>{`£${selectedApartmentAmount }`}</p>
            </div>

            <hr />

            <div className={styles.offered}>
              <p>Offer</p>
              <p>{`£${offer.PriceOffer}`}</p>
              <p>Offer Detail</p>
              <p>{offer.detail}</p>
            </div>

            <hr />

            <div className={styles.offerContact}>
              <img src="/dashboard/call.svg" alt="call" />
              <img src="/dashboard/whatsapp.svg" alt="whatsapp" />
              <img src="/dashboard/message.svg" alt="message" />
            </div>

            <hr />

            <div className={styles.decision}>
                {validStatuses.includes(offerStatuses[index]) ? (
                  <p style={getStatusStyle(offerStatuses[index])}>
                    {`Offer ${offerStatuses[index]}`}
                  </p>
                ) : (
                  <>
                    <button onClick={() => handleButtonClick(index, 'accepted')}>Accept</button>
                    <button onClick={() => handleButtonClick(index, 'on hold')}>Hold</button>
                    <button onClick={() => handleButtonClick(index, 'declined')}>Decline</button>
                  </>
                )}
              </div>
          </div>
      </div> 
        ))}
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
