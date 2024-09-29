import { useRouter } from "next/router";
import { useState, useEffect, useRef, useContext } from "react";
import styles from "../../styles/dashboard/transaction.module.css";
import { LoginContext } from "../../context/Login.context";
import Link from "next/link";
import { toast } from "react-toastify";
import { useImageContext } from "../../context/ImageContext.context";
import Loading from "../Loading";
const Transactions = () => {
  const router = useRouter();
  const { option, type } = router.query;


  const [currentType, setCurrentType] = useState(type || "transaction");
  const [apartments, setApartments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [selectedApartmentAmount, setSelectedApartmentAmount] = useState(null);
  const [selectedApartmentAddress, setSelectedApartmentAddress] = useState(null);
  const [selectedApartmentTitle, setSelectedApartmentTitle] = useState(null);
  const [offersReceived, setOffersReceived] = useState([]);
  const [offersDeclined, setOffersDeclined] = useState([]);
  const [offersAccepted, setOffersAccepted] = useState([]);
  const [offersHold, setOffersHold] = useState([]);
  const [propertyOffers, setPropertyOffers] = useState([]);
  const [sentOffers, setSentOffers] = useState([]);
  const count = useRef(1);
  const [update, setUpdate] = useState(false);



  useEffect(() => {
    setCurrentType(type || "transaction");
  }, [type]);


  const handleChange = (newType) => {
    router.push(`/dashboard?option=transaction&type=${newType}`, undefined, { shallow: true });
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
      console.log("userId:", userId);
      setUserId(userId);

      const fetchData = async () => {

        try {
          const apartmentsResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/apartments/getuserapartments/${userId}`);
          const apartmentsData = await apartmentsResponse.json();
          setApartments(apartmentsData.data);


          const offersReceivedResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/offer/getoffersreceived/${userId}`);
          const offersReceivedData = await offersReceivedResponse.json();
          setOffersReceived(offersReceivedData);
          setOffersDeclined(offersReceivedData);
          setOffersAccepted(offersReceivedData);
          setOffersHold(offersReceivedData);
          console.log("offersReceivedData:", offersReceivedData);

          const offersSentResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/offer/getofferssent/${userId}`);
          const offersSentData = await offersSentResponse.json();
          setSentOffers(offersSentData);
          console.log("offersSentData:", offersSentData);

        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data. Please try again later.");
        } finally {

        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (selectedApartmentId) {
      const fetchPropertyOffers = async () => {

        try {
          const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/offer/getapartmentoffer/${selectedApartmentId}`);
          const data = await response.json();
          setPropertyOffers(data.offers);
          console.log("propertyOffers:", data.offers);
          toast.success("Property offers fetched successfully.");
        } catch (error) {
          console.error("Error fetching property offers:", error);

          toast.error("Error fetching property offers. Please try again later.");
        } finally {

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
  const handleViewDeclinedOffers = (apartmentId, apartmentAmount, apartmentAddress, apartmentTitle) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);
    setSelectedApartmentAddress(apartmentAddress);
    setSelectedApartmentTitle(apartmentTitle);
    handleChange("viewDeclinedOffers");
  };
  const handleViewHoldOffers = (apartmentId, apartmentAmount, apartmentAddress, apartmentTitle) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);
    setSelectedApartmentAddress(apartmentAddress);
    setSelectedApartmentTitle(apartmentTitle);
    handleChange("viewHoldOffers");
  };
  const handleViewOngoing = (apartmentId, apartmentAmount, apartmentAddress, apartmentTitle) => {
    setSelectedApartmentId(apartmentId);
    setSelectedApartmentAmount(apartmentAmount);
    setSelectedApartmentAddress(apartmentAddress);
    setSelectedApartmentTitle(apartmentTitle);
    handleChange("viewOngoingTransactions");
  };



  let offers = "offers";



  return (
    <div className={styles.Section}>

      {currentType === "transaction" && <MainTransaction handleChange={handleChange} offers={offers} />}
      {currentType === "offers" && <Offers handleChange={handleChange} />}
      {currentType === "ongoing" && <Ongoing apartments={apartments} propertyOffers={propertyOffers} handleChange={handleChange} handleViewOngoing={handleViewOngoing} offersAccepted={offersAccepted} />}
      {currentType === "offerReceived" && (
        <OfferReceived
          handleViewOffers={handleViewOffers}
          apartments={apartments}
          userId={userId}
          handleChange={handleChange}
          offersReceived={offersReceived}
        />
      )}
      {currentType === "viewOffers" && (
        <ViewOffers
          userId={userId}
          selectedApartmentId={selectedApartmentId}
          selectedApartmentAmount={selectedApartmentAmount}
          handleChange={handleChange}
          propertyOffers={propertyOffers}

        />
      )}

      {currentType === "OffersAccepted" && <OffersAccepted apartments={apartments} propertyOffers={propertyOffers} handleChange={handleChange} handleViewAcceptedOffers={handleViewAcceptedOffers} offersAccepted={offersAccepted} />}
      {currentType === "offersOnHold" && <OffersOnHold handleChange={handleChange} offersHold={offersHold} apartments={apartments} handleViewHoldOffers={handleViewHoldOffers} />}
      {currentType === "offersDeclined" && <OffersDeclined handleViewDeclinedOffers={handleViewDeclinedOffers} handleChange={handleChange} propertyOffers={propertyOffers} apartments={apartments} offersDeclined={offersDeclined} />}
      {currentType === "completedTransactions" && <CompletedTransactions handleChange={handleChange} />}
      {currentType === "CancelledTransactions" && <CancelledTransactions handleChange={handleChange} />}
      {currentType === "viewAcceptedOffers" && <ViewAcceptedOffers handleChange={handleChange} selectedApartmentAddress={selectedApartmentAddress} selectedApartmentTitle={selectedApartmentTitle} selectedApartmentId={selectedApartmentId}
        selectedApartmentAmount={selectedApartmentAmount}
        propertyOffers={propertyOffers} />}
      {currentType === "viewOngoingTransactions" && <ViewOngoingTransactions handleChange={handleChange} selectedApartmentAddress={selectedApartmentAddress} selectedApartmentTitle={selectedApartmentTitle} selectedApartmentId={selectedApartmentId}
        selectedApartmentAmount={selectedApartmentAmount}
        propertyOffers={propertyOffers} />}
      {currentType === "viewDeclinedOffers" && <ViewDeclinedOffers handleChange={handleChange} propertyOffers={propertyOffers} selectedApartmentAmount={selectedApartmentAmount} selectedApartmentAddress={selectedApartmentAddress} selectedApartmentTitle={selectedApartmentTitle} />}
      {currentType === "viewHoldOffers" && <ViewHoldOffers handleChange={handleChange} propertyOffers={propertyOffers} selectedApartmentAmount={selectedApartmentAmount} selectedApartmentAddress={selectedApartmentAddress} selectedApartmentTitle={selectedApartmentTitle} handleViewHoldOffers={handleViewHoldOffers} />}
    </div>
  );
};

export default Transactions;


const MainTransaction = ({ handleChange, offers }) => {
  const router = useRouter();

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
        <div className={`${styles.Box} card`} onClick={() => handleChange("offers")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("ongoing")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Ongoing transactions</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("completedTransactions")}>
          <img src="/dashboard/check.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Completed transactions</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("CancelledTransactions")}>
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
          className={`${styles.Box} card`}
          onClick={() => handleChange("offerReceived")}
        >
          <img src="/dashboard/receive.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers received</p>
          <p className={styles.BoxText}>Transactions currently ongoing</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("OffersAccepted")}>
          <img src="/dashboard/accepted.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers Accepted</p>
          <p className={styles.BoxText}>Transactions completed in full</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("offersOnHold")}>
          <img src="/dashboard/hold.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers on hold</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
        <div className={`${styles.Box} card`} onClick={() => handleChange("offersDeclined")}>
          <img src="/dashboard/cancel.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Offers declined</p>
          <p className={styles.BoxText}>Transactions halted</p>
        </div>
      </div>
    </>
  );
};

const OfferReceived = ({ handleChange, userId, apartments, handleViewOffers, offersReceived = {} }) => {
  // Ensure offersReceived.offers is an array before using it
  const apartmentsWithOffers = apartments.filter(apartment => {
    return Array.isArray(offersReceived.offers) && offersReceived.offers.some(offer => offer.apartmentId === apartment._id);
  });

  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={() => handleChange("offers")} className={`${styles.Header} cursor-pointer`}>
          {"< Offers received"}
        </h1>

        <div className={styles.search}>
          <input type="text" placeholder="search property" />
          <img src="/navbar/search.svg" />
        </div>
      </div>

      <div className={styles.propertyList}>
        {apartmentsWithOffers.length > 0 ? (
          apartmentsWithOffers.map(apartment => (
            <div key={apartment._id} className={styles.propertyContainer}>
              <div className={styles.Property}>
                <div className={styles.PropertyImg}>
                  <img src={apartment.images[0]} alt={apartment.Title} />

                  <div className={styles.propertyText}>
                    <p>{apartment.Title || "Title N/A"}</p>
                    <p className="line-clamp-2">{apartment.address || "Address N/A"}</p>
                    <p>{`Last updated: ${new Date(apartment.date_created).toLocaleDateString()}`}</p>
                  </div>
                </div>

                <hr />

                <div className={styles.PropertyInfo}>
                  <p> Listing ID: {apartment._id ? apartment._id.slice(-6) : ' N/A'}</p>
                  <p>{`£ ${apartment.Amount}`}</p>
                  <p>{`Status: ${apartment.status || "Available"}`}</p>
                </div>

                <hr />

                <button className={styles.viewOffer} onClick={() => handleViewOffers(apartment._id, apartment.Amount)}>
                  <p>View offers</p>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers received for the listed apartments.</p>
        )}
      </div>
    </>
  );
};

const ViewOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentId }) => {
  const [offerStatuses, setOfferStatuses] = useState({});
  const [offerAlreadyAccepted, setOfferAlreadyAccepted] = useState();
  const router = useRouter()
  const { setLoading, loading } = useImageContext();

  const handleButtonClick = async (index, status, apartmentId, offerId, userId) => {
    await setOfferStatuses(prevStatuses => ({
      ...prevStatuses,
      [index]: status
    }));

    await handleOffer(apartmentId, offerId, userId, status);


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
    setLoading(true);

    let updatedOffers = [...propertyOffers];
    try {
      const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/offer/changeofferstatus?apartmentid=${apartmentId}&userid=${userId}&offerid=${offerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),

      });
      const data = await response.json();
      console.log("data:", data);

      if (response.ok) {
        toast.success("Offer status updated successfully");
        setloading(false);
        await router.push("/dashboard?option=transaction&type=offerReceived")
        window.location.reload();
      }


      if (data.message === 'Property already has an accepted offer') {
        setOfferAlreadyAccepted(data.message);

        // Revert the status change if there's an error or conflict
        updatedOffers[index].status = 'pending'; // or revert to the previous status
        setPropertyOffers(updatedOffers);
        toast.warning("Property already has an accepted offer");
        setloading(false);
      }
    } catch (error) {
      console.error("Error updating offer status:", error);
      // Revert the status if an error occurs
      updatedOffers[index].status = 'pending'; // or revert to the previous status
      setPropertyOffers(updatedOffers);
      toast.error("Error updating offer status");
      setLoading(false);
    } finally {
      setLoading(false);
    }


  }
  return (
    <>
      {loading && <Loading />}
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
        {Array.isArray(propertyOffers) && propertyOffers.length > 0 ? (
          propertyOffers.map((offer, index) => (
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
          ))
        ) : (
          // Display this message when no offers are available
          <div className={"h-[600px] flex justify-center items-center"}>
            <p className="italic">No offers available at the moment..</p>
          </div>
        )}
      </div>
    </>
  );
};

const OffersAccepted = ({ handleChange, apartments, propertyOffers = [], handleViewAcceptedOffers, offersAccepted }) => {
  const apartmentsWithOffers = apartments.filter(apartment => {
    return Array.isArray(offersAccepted.offers) && offersAccepted.offers.some(offer => offer.apartmentId === apartment._id && offer.status === "accepted");
  });

  return (
    <>
      <h1 className="text-2xl font-medium cursor-pointer" onClick={() => handleChange("offers")}>{"< Offers Accepted"}</h1>
      <div className={styles.propertyList}>
        {apartmentsWithOffers.length > 0 ? (
          apartmentsWithOffers.map(apartment => (
            <div key={apartment._id} className={styles.propertyContainer}>
              <div className={styles.Property}>
                <div className={styles.PropertyImg}>
                  <img src={apartment.images[0]} alt={apartment.Title} />

                  <div className={styles.propertyText}>
                    <p>{apartment.Title || "Title N/A"}</p>
                    <p className="line-clamp-2">{apartment.address || "Address N/A"}</p>
                    <p>{`Last updated: ${new Date(apartment.date_created).toLocaleDateString()}`}</p>
                  </div>
                </div>

                <hr />

                <div className={styles.PropertyInfo}>
                  <p> Listing ID: {apartment._id ? apartment._id.slice(-6) : ' N/A'}</p>
                  <p>{`£ ${apartment.Amount}`}</p>
                  <p>{`Status: ${apartment.status || "Available"}`}</p>
                </div>

                <hr />

                <button className={styles.viewOffer} onClick={() => handleViewAcceptedOffers(apartment._id, apartment.Amount, apartment.address, apartment.Title)}>
                  <p>View offers</p>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers received for the listed apartments.</p>
        )}
      </div>
    </>
  );
}

const ViewAcceptedOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentTitle, selectedApartmentAddress }) => {

  const router = useRouter();
  return (
    <>
      <h3 className="text-2xl font-medium cursor-pointer" onClick={() => handleChange("OffersAccepted")}>{"< View Accepted Offers"}</h3>
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

const OffersOnHold = ({ handleChange, apartments, offersHold, handleViewHoldOffers }) => {
  const apartmentsWithOffers = apartments.filter(apartment => {
    return Array.isArray(offersHold.offers) && offersHold.offers.some(offer => offer.apartmentId === apartment._id && offer.status === "on hold");
  });
  return (
    <>
      <h1 className="text-2xl font-medium cursor-pointer" onClick={() => handleChange("offers")}>{"< Offers on hold"}</h1>
      <div className={styles.propertyList}>
        {apartmentsWithOffers.length > 0 ? (
          apartmentsWithOffers.map(apartment => (
            <div key={apartment._id} className={styles.propertyContainer}>
              <div className={styles.Property}>
                <div className={styles.PropertyImg}>
                  <img src={apartment.images[0]} alt={apartment.Title} />

                  <div className={styles.propertyText}>
                    <p>{apartment.Title || "Title N/A"}</p>
                    <p className="line-clamp-2">{apartment.address || "Address N/A"}</p>
                    <p>{`Last updated: ${new Date(apartment.date_created).toLocaleDateString()}`}</p>
                  </div>
                </div>

                <hr />

                <div className={styles.PropertyInfo}>
                  <p> Listing ID: {apartment._id ? apartment._id.slice(-6) : ' N/A'}</p>
                  <p>{`£ ${apartment.Amount}`}</p>
                  <p>{`Status: ${apartment.status || "Available"}`}</p>
                </div>

                <hr />

                <button className={styles.viewOffer} onClick={() => handleViewHoldOffers(apartment._id, apartment.Amount, apartment.address, apartment.Title)}>
                  <p>View offers</p>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers received for the listed apartments.</p>
        )}
      </div>
    </>
  );
}

const ViewHoldOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentTitle, selectedApartmentAddress }) => {

  return (
    <>
      <h3 className="text-xl font-semibold cursor-pointer" onClick={() => handleChange("offersOnHold")}>{"< View Offers on Hold"}</h3>
      <div className={styles.viewOfferListing}>
        {Array.isArray(propertyOffers) && propertyOffers.filter(offer => offer.status === "accepted").length > 0 ? (
          propertyOffers.filter(offer => offer.status === "declined").map((offer, index) => (
            <div key={offer._id} className={styles.viewOfferContainer}>
              <div className={styles.Offer}>
                <div className={styles.actualPrice}>
                  <span>{`£${selectedApartmentAmount}`}</span>
                  <span>{selectedApartmentTitle}</span>
                  <span className="line-clamp-1  text-xs">{selectedApartmentAddress}</span>
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

                <div className={""}>
                  <button className="bg-blue-600 p-3 rounded-lg text-white text-md">On Hold</button>
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

const OffersDeclined = ({ handleChange, apartments, propertyOffers = [], handleViewDeclinedOffers, offersDeclined }) => {
  const apartmentsWithOffers = apartments.filter(apartment => {
    return Array.isArray(offersDeclined.offers) && offersDeclined.offers.some(offer => offer.apartmentId === apartment._id && offer.status === "declined");
  });


  return (
    <>
      <h1 className="text-2xl cursor-pointer font-medium" onClick={() => handleChange("offers")}>{"< Offers Declined"}</h1>
      <div className={styles.propertyList}>
        {apartmentsWithOffers.length > 0 ? (
          apartmentsWithOffers.map(apartment => (
            <div key={apartment._id} className={styles.propertyContainer}>
              <div className={styles.Property}>
                <div className={styles.PropertyImg}>
                  <img src={apartment.images[0]} alt={apartment.Title} />

                  <div className={styles.propertyText}>
                    <p>{apartment.Title || "Title N/A"}</p>
                    <p className="line-clamp-2">{apartment.address || "Address N/A"}</p>
                    <p>{`Last updated: ${new Date(apartment.date_created).toLocaleDateString()}`}</p>
                  </div>
                </div>

                <hr />

                <div className={styles.PropertyInfo}>
                  <p> Listing ID: {apartment._id ? apartment._id.slice(-6) : ' N/A'}</p>
                  <p>{`£ ${apartment.Amount}`}</p>
                  <p>{`Status: ${apartment.status || "Available"}`}</p>
                </div>

                <hr />

                <button className={styles.viewOffer} onClick={() => handleViewDeclinedOffers(apartment._id, apartment.Amount, apartment.address, apartment.Title)}>
                  <p>View offers</p>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers received for the listed apartments.</p>
        )}
      </div>
    </>
  );
}

const ViewDeclinedOffers = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentTitle, selectedApartmentAddress }) => {

  return (
    <>
      <h3 className="text-xl font-semibold cursor-pointer" onClick={() => handleChange("offersDeclined")}>{"< View Declined Offers"}</h3>
      <div className={styles.viewOfferListing}>
        {Array.isArray(propertyOffers) && propertyOffers.filter(offer => offer.status === "accepted").length > 0 ? (
          propertyOffers.filter(offer => offer.status === "declined").map((offer, index) => (
            <div key={offer._id} className={styles.viewOfferContainer}>
              <div className={styles.Offer}>
                <div className={styles.actualPrice}>
                  <span>{`£${selectedApartmentAmount}`}</span>
                  <span>{selectedApartmentTitle}</span>
                  <span className="line-clamp-1  text-xs">{selectedApartmentAddress}</span>
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

                <div className={""}>
                  <button className="bg-red-600 p-2 rounded-lg text-white text-md">Declined</button>
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

const CompletedTransactions = ({ handleChange }) => {

  const { userInformation } = useContext(LoginContext);
  const userId = userInformation?.user?.id;

  const [completedData, setCompletedData] = useState([])

  useEffect(() => {
    const fetchCompletedTransactions = async () => {
      if (userId) {
        const res = await fetch(
          `https://nutlip-server.uc.r.appspot.com/api/transaction/getCompletedTransactionForAUser/${userId}`
        );
        const data = await res.json();
        console.log("Completed Transaction", data);
        setCompletedData(data.data);
      }
    };

    fetchCompletedTransactions();
  }, [userId]);



  return (
    <div className={styles.Section}>
      <div className={styles.Header}>
        <h1 onClick={() => handleChange("transaction")}>Completed Transactions</h1>
      </div>

      {completedData.map((data) => {
        return (
          <Link
            href={`/transactions/current/${data?.transaction?._id}`}
            key={data?._id}
            className={`${styles.Box} bg-white w-full rounded-lg shadow-md`}
          >
            <p>Transaction Id: {data?.transaction?._id.slice(0, 7)}</p>
            <p>
              Transaction Stage :
              {data?.transaction?.transactionCurrentStage}
            </p>
          </Link>
        );
      })}



    </div>
  );
}

const CancelledTransactions = ({ handleChange }) => {
  const { userInformation } = useContext(LoginContext);

  const userId = userInformation?.user?.id;


  const [cancelledData, setCancelledData] = useState([])

  useEffect(() => {
    const fetchCancelledtransactions = async () => {
      if (userId) {
        const res = await fetch(
          `https://nutlip-server.uc.r.appspot.com/api/transaction/getCanceledTransactionForAUser/${userId}`
        );
        const data = await res.json();
        console.log("Cancelled Transaction", data);
      }
    };

    fetchCancelledtransactions();
  }, [userId]);

  return (
    <div className={styles.Section}>
      <div className={styles.Header}>
        <h1 onClick={() => handleChange("transaction")}>Cancelled Transactions</h1>
      </div>

      {
        cancelledData.length == 0 && (
          <p>No Cancelled transactions found.</p>
        )
      }

    </div>
  );
}

const Ongoing = ({ handleChange, apartments, propertyOffers = [], handleViewOngoing, handleViewAcceptedOffers, offersAccepted }) => {
  const apartmentsWithOffers = apartments.filter(apartment => {
    return Array.isArray(offersAccepted.offers) && offersAccepted.offers.some(offer => offer.apartmentId === apartment._id && offer.status === "accepted");
  });
  return (
    <>
      <h1 className="text-2xl font-medium cursor-pointer" onClick={() => handleChange("transaction")}>{"< Ongoing "}</h1>
      <div className={styles.propertyList}>
        {apartmentsWithOffers.length > 0 ? (
          apartmentsWithOffers.map(apartment => (
            <div key={apartment._id} className={styles.propertyContainer}>
              <div className={styles.Property}>
                <div className={styles.PropertyImg}>
                  <img src={apartment.images[0]} alt={apartment.Title} />

                  <div className={styles.propertyText}>
                    <p>{apartment.Title || "Title N/A"}</p>
                    <p className="line-clamp-2">{apartment.address || "Address N/A"}</p>
                    <p>{`Last updated: ${new Date(apartment.date_created).toLocaleDateString()}`}</p>
                  </div>
                </div>

                <hr />

                <div className={styles.PropertyInfo}>
                  <p> Listing ID: {apartment._id ? apartment._id.slice(-6) : ' N/A'}</p>
                  <p>{`£ ${apartment.Amount}`}</p>
                  <p>{`Status: ${apartment.status || "Available"}`}</p>
                </div>

                <hr />

                <button className={styles.viewOffer} onClick={() => handleViewOngoing(apartment._id, apartment.Amount, apartment.address, apartment.Title)}>
                  <p>View offers</p>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No offers received for the listed apartments.</p>
        )}
      </div>
    </>
  );
};

const ViewOngoingTransactions = ({ handleChange, propertyOffers = [], selectedApartmentAmount, selectedApartmentTitle, selectedApartmentAddress }) => {
  const router = useRouter();
  return (
    <>
      <h3 onClick={() => handleChange("ongoing")} className="text-2xl font-medium cursor-pointer">{"< Ongoing Transactions"}</h3>
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
