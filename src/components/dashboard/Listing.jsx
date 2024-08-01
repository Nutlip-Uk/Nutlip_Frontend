import { Apartment } from "@mui/icons-material";
import styles from "../../styles/dashboard/listing.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../context/Login.context";

const Listing = () => {
  const router = useRouter();
  //const { userId } = router.query; // Destructure userId from router.query
  const data = router.query;
  const [type, setType] = useState("allListing");
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInformation } = useContext(LoginContext);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const userId = userInformation?.user.id;

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
      setUpdate(!update);
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
      setUpdate(!update);
    }
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(`https://nutlip-backend.onrender.com/api/apartments/getuserapartments/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setApartments(data);
          console.log(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.Section}>
        {count.current === 1 && (
          <ListProperty
            next={next}
            handleChange={handleChange}
            type={type}
            userId={userId}
            apartments={apartments}
            selectedApartment={selectedApartment}
            setSelectedApartment={setSelectedApartment}

          />
        )}
        {count.current === 2 && <ListingDetail next={next} back={back} apartment={selectedApartment} />}
      </div>
    </>
  );
};

export default Listing;

const Navigation = ({ handleChange, type }) => {
  return (
    <>
      <div className={styles.NavContainer}>
        <div className={styles.selection}>
          <p
            className={`${type === "allListing" ? styles.selected : styles.unselected
              }`}
            onClick={() => handleChange("allListing")}
          >
            All listings
          </p>
          <p
            className={`${type === "recentlyAdded" ? styles.selected : styles.unselected
              }`}
            onClick={() => handleChange("recentlyAdded")}
          >
            Recently added
          </p>

          <p
            className={`${type === "featured" ? styles.selected : styles.unselected
              }`}
            onClick={() => handleChange("featured")}
          >
            Featured
          </p>
        </div>
        <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeholder="search property" />
        </div>
      </div>
    </>
  );
};

const ListProperty = ({ next, handleChange, type, userId, apartments, setSelectedApartment }) => {

  const handlePropertyClick = (apartment) => {
    setSelectedApartment(apartment);
    next();
  };


  return (
    <>
      <p className={styles.Header}>My Listing</p>
      <Navigation handleChange={handleChange} type={type} />
      <div className={styles.propertyListing}>
        {apartments.map((apartment) => (
          <div key={apartment?._id} className={styles.propertyContainer}>
            <input type="checkbox" />

            <div className={styles.Property} onClick={() => handlePropertyClick(apartment)}>
              <div className={styles.PropertyImg}>
                <img src={apartment?.images[0]} />

                <div className={styles.propertyText}>
                  <p>{apartment?.Title}</p>
                  <p>{apartment?.location}</p>

                  <div className={styles.propertySize}>
                    <li>
                      <img src="/bedroom.svg" alt="" />
                      <p>{apartment?.bedrooms}</p>
                    </li>
                    <li>
                      <img src="/bathtub.svg" alt="" />
                      <p>{apartment?.bathrooms}</p>
                    </li>
                    <li>
                      <img src="/chair.svg" alt="" />
                      <p>{apartment?.LivingRoom}</p>
                    </li>
                    <li>
                      <img width={"24"} height={"20"} src="https://img.icons8.com/ios/50/toilet-bowl.png" alt="toilet-bowl" />
                      <p>{apartment?.Toilets}</p>
                    </li>
                  </div>

                  {apartment.date_created && (
                    <p>
                      Last Updated:{" "}
                      {new Date(apartment.date_created).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <hr />

              <div className={styles.PropertyInfo}>
                <p>Listing ID: {apartment._id.slice(0, 5)}</p>
                <p>£ {apartment.Amount}</p>
                <p>Status: {apartment.isSold ? "Unavailable" : "Available"}</p>
                <p>View property</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


const ListingDetail = ({ next, back, handleChange, apartment }) => {

  if (!apartment) {
    return <div>No property selected.</div>;
  }

  return (
    <>
      <div className={styles.ListingDetailSection}>
        <p className={styles.NavBack} onClick={back}>
          {"< Back"}
        </p>

        <div className={styles.ListingDetailContainer}>
          <div className={styles.ListingDetailLeft}>
            <div className={styles.ListingDetailLeftImage}>
              <div className={styles.ListingDetailImageContainer}>
                <img src={apartment?.images[0]} alt="" />
              </div>

              <div id={styles.options}>
                <label>
                  <img
                    src={""}
                    width={25}
                    height={25}
                    alt="image-Thumbnail"
                  />
                  1/4
                </label>

                <label>
                  <img
                    src="/images/frame-42758-ph-video-light-1.svg"
                    width={25}
                    height={25}
                    alt="video-thumbnail"
                  />
                  2
                </label>

                <label>
                  <img
                    src="/images/frame-42758-bi-badge-vr-1.svg"
                    width={25}
                    height={25}
                    alt="vr-thumbnail"
                  />
                  2
                </label>

                <label>
                  <img
                    src="/images/frame-42758-teenyicons-floorplan-solid-1.svg"
                    width={25}
                    height={25}
                    alt="floor-plan-thumbnail"
                  />
                  1
                </label>

                <label>
                  <img
                    src="/images/frame-42758-bi-badge-vr.svg"
                    width={25}
                    height={25}
                    alt="thumbnail"
                  />
                  1
                </label>

                <label>
                  <img
                    src="/images/vuesax-linear-location.svg"
                    width={25}
                    height={25}
                    alt="thumbnail"
                  />
                </label>
              </div>
            </div>

            <div className={styles.ListingDetailInfo}>
              <div className={styles.ListingDetailInfoBox}>
                <div className={styles.ListingDetailPriceContainer}>
                  <p>£ {apartment?.Amount}</p>
                  <p>Listing ID: {apartment?._id.slice(0, 4)}</p>
                </div>
                <hr />
                <div className={styles.ListingDetailStatus}>
                  <div className={styles.facilities}>
                    <span>
                      <img
                        src="/images/mdi-bedroom-outline.svg"
                        width={25}
                        height={25}
                        alt="bedroom-thumbnail"
                      />
                      {apartment?.bedrooms}
                    </span>
                    <span>
                      <img
                        src="/images/mdi-shower.svg"
                        width={25}
                        height={25}
                        alt="bathroom-thumbnail"
                      />
                      {apartment?.bathrooms}
                    </span>
                    <span>
                      <img
                        src="/images/material-symbols-chair-outline.svg"
                        width={25}
                        height={25}
                        alt="livingroom-thumbnail"
                      />
                      1
                    </span>
                  </div>

                  <p className={styles.ListingDetailStatusAvailable}>
                    <p>Status: {apartment?.isSold ? "Unavailable" : "Available"}</p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ListingDetailRight}>
            <div className={styles.ListingDetailRightInfo}>
              <div className={styles.ListingDetailRightInfoHeader}>
                <p>{apartment?.Title}</p>
                <p>{apartment?.location}</p>
              </div>

              <div className={styles.ListingDetailRightText}>
                <p>
                  {apartment?.description}
                </p>

                <div className={styles.keyFeatures}>
                  <p>Key features</p>

                  <li>{apartment.Add_features}</li>

                </div>

                <div className="">
                  <p className={styles.Readmore}>Read more</p>
                  <p>{apartment.date_created}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
