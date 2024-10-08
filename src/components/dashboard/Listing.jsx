import { Apartment } from "@mui/icons-material";
import styles from "../../styles/dashboard/listing.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../context/Login.context";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Button, DialogActions, DialogContent, DialogTitle, ModalDialog } from "@mui/joy";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/apartments/getuserapartments/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setApartments(data.data);
          console.log(data);
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

  const deleteProperty = ({ apartment }) => {
    setIsModalOpen(true);
  }

  const HandleDelete = async ({ apartment }) => {
    console.log(`deleting ${apartment?.id}`)
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
            isModalOpen={isModalOpen}
            deleteProperty={deleteProperty}
            setIsModalOpen={setIsModalOpen}
            HandleDelete={HandleDelete}
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
          <button
            disabled
            className={`${type === "recentlyAdded" ? styles.selected : styles.unselected
              }`}
            onClick={() => handleChange("recentlyAdded")}
          >
            Recently added
          </button>

          <button
            disabled
            className={`${type === "featured" ? styles.selected : styles.unselected
              }`}
            onClick={() => handleChange("featured")}
          >
            Featured
          </button>
        </div>
        <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeholder="search property" />
        </div>
      </div>
    </>
  );
};

const ListProperty = ({ next, handleChange, type, userId, apartments, setSelectedApartment, deleteProperty, isModalOpen, setIsModalOpen, HandleDelete }) => {
  // Track selected properties via checkboxes
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Handle selecting or deselecting a property
  const handleCheckboxChange = (apartmentId) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(apartmentId)
        ? prevSelected.filter((id) => id !== apartmentId)
        : [...prevSelected, apartmentId]
    );
  };

  const handlePropertyClick = (apartment) => {
    setSelectedApartment(apartment);
    next();
  };

  // Redirect to edit form (this can be a separate page or modal form)
  const handleEdit = (apartment) => {
    // Navigate to edit page with apartment details
    setSelectedApartment(apartment); // Set the selected apartment for editing

  };

  return (
    <>
      <p className={styles.Header}>My Listing</p>
      <Navigation handleChange={handleChange} type={type} />
      <div className={styles.propertyListing}>
        {Array.isArray(apartments) &&
          apartments.map((apartment) => (
            <>
              <div key={apartment?._id} className={styles.propertyContainer}>
                {/* Checkbox for selecting a property */}
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(apartment?._id)}
                  checked={selectedProperties.includes(apartment?._id)}
                />

                <div
                  className={styles.Property}
                  onClick={() => handlePropertyClick(apartment)}
                >
                  <div className={styles.PropertyImg}>
                    <img src={apartment?.images[0]} />

                    <div className={styles.propertyText}>
                      <p>{apartment?.Title}</p>
                      <p className="line-clamp-1">{apartment?.location}</p>

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
                          <img
                            width={"24"}
                            height={"20"}
                            src="https://img.icons8.com/ios/50/toilet-bowl.png"
                            alt="toilet-bowl"
                          />
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

                {/* Conditionally show the buttons if the checkbox is checked */}
                {selectedProperties.includes(apartment._id) && (
                  <div className={`flex gap-x-3 items-center`}>
                    <button className="text-2xl text-blue-700 transition duration-300 hover:scale-110 focus:scale-110" onClick={() => handleEdit(apartment)}><FaRegEdit />
                    </button>
                    <button className="text-2xl text-red-600 transition duration-300 hover:scale-110 focus:scale-110" onClick={() => deleteProperty(apartment._id)}><MdDeleteOutline />
                    </button>
                  </div>
                )}
              </div>

              <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

              >
                <ModalDialog
                  color="danger"
                  variant="outlined"
                >

                  <ModalClose variant="plain" sx={{ m: 1 }} onClick={() => setIsModalOpen(false)} />
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent>Are you sure you want to delete this property ?</DialogContent>

                  <DialogActions>
                    <Button variant="contained" color="danger" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="danger" onClick={() => HandleDelete(apartment)}>Delete</Button>
                  </DialogActions>
                </ModalDialog>
              </Modal>

            </>
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
                    src={"/picture.svg"}
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

                  <ul>
                    {apartment?.Add_features.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

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
