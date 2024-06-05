import { Apartment } from "@mui/icons-material";
import styles from "../../styles/dashboard/listing.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from '../../context/Login.context';

const Listing = () => {

  const router = useRouter();
  const data = router.query;
  const [type, setType] = useState("allListing");

  const { userInformation } = useContext(LoginContext);

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

  return (
    <>
      <div className={styles.Section}>
        {count.current === 1 && (
          <ListProperty next={next} handleChange={handleChange} type={type} userId={userId} />
        )}
        {count.current === 2 && <ListingDetail next={next} back={back} />}
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
            className={`${
              type === "allListing" ? styles.selected : styles.unselected
            }`}
            onClick={() => handleChange("allListing")}
          >
            All listings
          </p>
          <p
            className={`${
              type === "recentlyAdded" ? styles.selected : styles.unselected
            }`}
            onClick={() => handleChange("recentlyAdded")}
          >
            Recently added
          </p>

          <p
            className={`${
              type === "featured" ? styles.selected : styles.unselected
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

const ListProperty = ({ next, handleChange, type, userId }) => {

  const [apartment, setApartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(`/api/apartments/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setApartment(data);
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
    fetchApartment();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <p className={styles.Header}>My Listing</p>

      <Navigation handleChange={handleChange} type={type} />

      <div className={styles.propertyContainer}>
        <input type="checkbox" />

        <div className={styles.Property} onClick={next}>
          <div className={styles.PropertyImg}>
            <img src="/dashboard/listimg.png" />

            <div className={styles.propertyText}>
              {apartment ? (
                <>
                  <p>{apartment.title}</p>
                  <p>{apartment.location}</p>
                  {/* Check if user exists before accessing its properties */}
                  {user && user.date_created && (
                    <p>
                      Last Updated:{" "}
                      {new Date(user.date_created).toLocaleString()}
                    </p>
                  )}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          <hr />

          <div className={styles.PropertyInfo}>
            <p>Listing ID: WYE12</p>
            {apartment ? (
              <>
                <p>{apartment.Amount}</p>
                <p>Is Sold: {apartment.isSold ? "Yes" : "No"}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <p>View property</p>
          </div>
        </div>
      </div>
    </>
  );
};

const ListingDetail = ({ next, back, handleChange }) => {
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
                <img src="/dashboard/listimg.png" alt="" />
              </div>

              <div id={styles.options}>
                <label>
                  <img
                    src="/images/frame-42758-system-uicons-picture-1.svg"
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
                  <p>£ 706,000</p>
                  <p>Listing ID: WYVEI112</p>
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
                      2
                    </span>
                    <span>
                      <img
                        src="/images/mdi-shower.svg"
                        width={25}
                        height={25}
                        alt="bathroom-thumbnail"
                      />
                      2
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
                    Status : Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ListingDetailRight}>
            <div className={styles.ListingDetailRightInfo}>
              <div className={styles.ListingDetailRightInfoHeader}>
                <p>3 bedroom flat for sale</p>
                <p>Navino road, London E8</p>
              </div>

              <div className={styles.ListingDetailRightText}>
                <p>
                  This resplendent Georgian conversion property is wonderfully
                  located for transport links, local amenities and green urban
                  spaces. The perfect first time buy or buy to let opportunity.
                </p>

                <div className={styles.keyFeatures}>
                  <p>Key features</p>

                  <li>Sold in March 2023</li>
                  <li>Three bedrooms</li>
                  <li>Family bathroom and guest w/</li>
                  <li>Built in wardrobes to bedroom one and two</li>
                  <li>17ft garage and off street parking</li>
                  <li>41ft secluded rear garden</li>
                  <li>
                    South facing terrace to the front with fantastic views
                  </li>
                </div>

                <div className="">
                  <p className={styles.Readmore}>Read more</p>
                  <p>Listed on 10th Jun 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
