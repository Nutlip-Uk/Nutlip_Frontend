import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/dashboard/transaction.module.css";

const Transactions = () => {
  const router = useRouter();
  const data = router.query;

  const [type, setType] = useState("transaction");
  const [apartments, setApartments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [selectedApartmentAmount, setSelectedApartmentAmount] = useState(null);
  const [selectedApartmentAddress, setSelectedApartmentAddress] = useState(null);
  const [selectedApartmentTitle, setSelectedApartmentTitle] = useState(null);
  const [offersReceived, setOffersReceived] = useState([]);
  const [propertyOffers, setPropertyOffers] = useState([]);
  const [sentOffers, setSentOffers] = useState([]);
  const count = useRef(1);
  const [update, setUpdate] = useState(false);

  const handleChange = (newType) => {
    setType(newType);
  };

  const next = () => {
    if (count.current <= 4) {
      count.current += 1;
      setUpdate(!update);
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current -= 1;
      setUpdate(!update);
    }
  };

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    if (userInformation && userInformation.user) {
      const userId = userInformation.user.id;
      setUserId(userId);

      const fetchData = async () => {
        try {
          const apartmentsResponse = await fetch(`/api/apartments/${userId}`);
          const apartmentsData = await apartmentsResponse.json();
          setApartments(apartmentsData);

          const offersReceivedResponse = await fetch(`/api/offer/getoffersreceived/${userId}`);
          const offersReceivedData = await offersReceivedResponse.json();
          setOffersReceived(offersReceivedData);

          const offersSentResponse = await fetch(`/api/offer/getofferssent/${userId}`);
          const offersSentData = await offersSentResponse.json();
          setSentOffers(offersSentData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (selectedApartmentId) {
      const fetchPropertyOffers = async () => {
        try {
          const response = await fetch(`/api/offer/getpropertyoffers/${selectedApartmentId}`);
          const data = await response.json();
          setPropertyOffers(data.offers);
          console.log("propertyOffers:", data.offers);
        } catch (error) {
          console.error("Error fetching property offers:", error);
        }
      };

      fetchPropertyOffers();
    }
  }, [selectedApartmentId]);

  const handleViewOffers = (apartmentId, apartmentAmount, apartmentAddress, apartmentTitle) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);

    handleChange("viewOffers");
  };


  const handleViewAcceptedOffers = (apartmentId, apartmentAmount, apartmentAddress, apartmentTitle) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);
    setSelectedApartmentAddress(apartmentAddress);
    setSelectedApartmentTitle(apartmentTitle);
    handleChange("viewAcceptedOffers");
  };

  return (
    <div className={styles.Section}>
      {type === "transaction" && <MainTransaction handleChange={handleChange} />}
      {type === "offers" && <Offers handleChange={handleChange} />}
      {type === "ongoing" && <Ongoing handleChange={handleChange} />}
      {type === "offerReceived" && (
        <OfferReceived
          handleViewOffers={handleViewOffers}
          apartments={apartments}
          userId={userId}
          handleChange={handleChange}
        />
      )}
      {type === "viewOffers" && (
        <ViewOffers
          userId={userId}
          selectedApartmentId={selectedApartmentId}
          selectedApartmentAmount={selectedApartmentAmount}
          handleChange={handleChange}
          propertyOffers={propertyOffers}

        />
      )}

      {type === "OffersAccepted" && <OffersAccepted apartments={apartments} propertyOffers={propertyOffers} handleChange={handleChange} handleViewAcceptedOffers={handleViewAcceptedOffers} />}
      {type === "offersOnHold" && <OffersOnHold handleChange={handleChange} />}
      {type === "offersDeclined" && <OffersDeclined handleChange={handleChange} />}
      {type === "completedTransactions" && <CompletedTransactions handleChange={handleChange} />}
      {type === "CancelledTransactions" && <CancelledTransactions handleChange={handleChange} />}
      {type === "viewAcceptedOffers" && <ViewAcceptedOffers handleChange={handleChange} selectedApartmentAddress={selectedApartmentAddress} selectedApartmentTitle={selectedApartmentTitle} selectedApartmentId={selectedApartmentId}
        selectedApartmentAmount={selectedApartmentAmount}
        propertyOffers={propertyOffers} />}
    </div>
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
        <div className={styles.Box} onClick={() => handleChange("completedTransactions")}>
          <img src="/dashboard/check.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Completed transactions</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("CancelledTransactions")}>
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
        <div className={styles.Box} onClick={() => handleChange("OffersAccepted")}>
          <img src="/dashboard/accepted.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers Accepted</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("offersOnHold")}>
          <img src="/dashboard/hold.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers on hold</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("offersDeclined")}>
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
                <p> Listing ID: {apartment._id ? apartment?._id.slice(-6) : ' N/A'}</p>
                <p>{`£ ${apartment?.Amount}`}</p>
                <p>{`Status: ${apartment.status || "Available"}`}</p>
              </div>

              <hr />

              <button className={styles.viewOffer} onClick={() => handleViewOffers(apartment._id, apartment.Amount)}>
                <p>View offers</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ViewOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentId }) => {
  const [offerStatuses, setOfferStatuses] = useState({});
  const [offerAlreadyAccepted, setOfferAlreadyAccepted] = useState();

  const handleButtonClick = (index, status, apartmentId, offerId, userId) => {
    setOfferStatuses(prevStatuses => ({
      ...prevStatuses,
      [index]: status
    }));

    handleOffer(apartmentId, offerId, userId, status);
  };

  useEffect(() => {
    let timer;
    if (offerAlreadyAccepted) {
      timer = setTimeout(() => {
        setOfferAlreadyAccepted(null);
      }, 3000); // Hide after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [offerAlreadyAccepted]);

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

  const handleOffer = async (apartmentId, offerId, userId, status) => {
    console.log("apartmentId:", apartmentId, "offerId:", offerId, "userId:", userId, "status:", status)
    try {
      const response = await fetch(`/api/offer/change_status/${apartmentId}/${offerId}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      console.log("data:", data);

      if (data.message === 'Property already has an accepted offer') {
        setOfferAlreadyAccepted(data.message)
      }
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={() => handleChange("offerReceived")} className={styles.NavBack}>
          {"< Back"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeholder="search property" />
          <img src="/navbar/search.svg" alt="search" />
        </div>
      </div>

      <div className={styles.viewOfferListing}>
        {offerAlreadyAccepted && (
          <div className={styles.acceptedcontainer}>
            <p className={styles.alreadyAccepted}>This {offerAlreadyAccepted}</p>
          </div>
        )}
        {Array.isArray(propertyOffers) && propertyOffers.map((offer, index) => (
          <div key={offer._id} className={styles.viewOfferContainer}>
            <div className={styles.Offer}>
              <div className={styles.actualPrice}>
                <p>Actual price</p>
                <p>{`£${selectedApartmentAmount}`}</p>
              </div>

              <hr />

              <div className={styles.offered}>
                <p>Offer</p>
                <p>{`£${offer.PriceOffer}`}</p>
                <p>Offer Detail</p>
                {/* <p>offer id {offer._id}</p>
                <p>apartment id {offer.apartmentId}</p>
                <p>user.id {offer.userId}</p> */}
              </div>

              <hr />

              <div className={styles.offerContact}>
                <img src="/dashboard/call.svg" alt="call" />
                <img src="/dashboard/whatsapp.svg" alt="whatsapp" />
                <img src="/dashboard/message.svg" alt="message" />
              </div>

              <hr />

              <div className={styles.decision}>
                {offer.status === 'accepted' || offer.status === 'on hold' || offer.status === 'declined' ? (
                  <p style={getStatusStyle(offer.status)}>
                    {`Offer ${offer.status}`}
                  </p>
                ) : (
                  <>
                    <button onClick={() => handleButtonClick(index, 'accepted', offer.apartmentId, offer._id, offer.userId)}>Accept</button>
                    <button onClick={() => handleButtonClick(index, 'on hold', offer.apartmentId, offer._id, offer.userId)}>Hold</button>
                    <button onClick={() => handleButtonClick(index, 'declined', offer.apartmentId, offer._id, offer.userId)}>Decline</button>
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


const OffersAccepted = ({ handleChange, apartments, propertyOffers = [], handleViewAcceptedOffers }) => {

  return (
    <>
      <h1 onClick={() => handleChange("offers")}>Offers Accepted</h1>
      <div className={styles.propertyList}>
        {apartments?.map((apartment) => (
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
                <p> Listing ID: {apartment._id ? apartment?._id.slice(-6) : ' N/A'}</p>
                <p>{`£ ${apartment?.Amount}`}</p>
                <p>{`Status: ${apartment.status || "Available"}`}</p>
              </div>

              <hr />

              <button className={styles.viewOffer} onClick={() => handleViewAcceptedOffers(apartment._id, apartment.Amount, apartment.address, apartment.Title)}>
                <p>View offers</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


const ViewAcceptedOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentTitle, selectedApartmentAddress }) => {

  const router = useRouter();
  return (
    <>
      <h3 onClick={() => handleChange("OffersAccepted")}>View Accepted Offers</h3>
      <div className={styles.viewOfferListing}>
        {Array.isArray(propertyOffers) && propertyOffers.filter(offer => offer.status === "accepted").length > 0 ? (
          propertyOffers.filter(offer => offer.status === "accepted").map((offer, index) => (
            <div onClick={() => router.push(`/transactions/current/${offer.transaction_id}`)} key={offer._id} className={styles.viewOfferContainer}>
              <div className={styles.Offer}>
                <div className={styles.actualPrice}>
                  <span>{`£${selectedApartmentAmount}`}</span>
                  <span>{selectedApartmentTitle}</span>
                  <span>{selectedApartmentAddress}</span>
                </div>

                <hr />

                <div className={styles.offered}>
                  <p>Offer</p>
                  <p>{`£${offer.PriceOffer}`}</p>
                  <p>Offer Detail</p>
                  {/* <p>offer id {offer._id}</p>
                <p>apartment id {offer.apartmentId}</p>
                <p>user.id {offer.userId}</p> */}
                </div>

                <hr />

                <div className={styles.offerContact}>
                  <img src="/dashboard/call.svg" alt="call" />
                  <img src="/dashboard/whatsapp.svg" alt="whatsapp" />
                  <img src="/dashboard/message.svg" alt="message" />
                </div>

                <hr />

                <div className={styles.decision}>
                  <button>Accepted</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No accepted offers at this time.</p>
        )}
      </div>
    </>
  )
}

const OffersOnHold = ({ handleChange }) => {
  return (
    <>
      <h1 onClick={() => handleChange("offers")}>Offers on hold</h1>
      .
    </>
  );
}


const OffersDeclined = ({ handleChange }) => {
  return (
    <>
      <h1 onClick={() => handleChange("offers")}>Offers Declined</h1>
    </>
  );
}

const CompletedTransactions = ({ handleChange }) => {
  return (
    <>
      <h1 onClick={() => handleChange("transaction")}>Completed Transactions</h1>
    </>
  );
}

const CancelledTransactions = ({ handleChange }) => {
  return (
    <>
      <h1 onClick={() => handleChange("transaction")}>Cancelled Transactions</h1>
    </>
  );
}

const Ongoing = ({ handleChange }) => {
  return (
    <>
      <h1 onClick={() => handleChange("transaction")}>{"< Ongoing"}</h1>
    </>
  );
};
