import styles from "../../styles/buy/Buycatelogue.module.css"
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { buy } from './../../utils/buyproperties';
import { useRouter } from "next/router"
import Link from 'next/link';
import { useState, useEffect, useContext } from "react";

import { UserTypeContext } from "../../context/UserType.context";
<<<<<<< HEAD
import OfferModal from "../Modals/Offer.modal";
=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731


export const BuyCatalogue = ({ properties, isLoading }) => {


  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {
            properties?.map((property) => (
              <Property key={property._id} property={property} isLoading={isLoading} />
            ))
          }
        </div>
      </div>
    </section>
  )
}


function Property({ property, isLoading }) {
  const router = useRouter()
  const date = new Date(property?.date_created);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const { userType } = useContext(UserTypeContext);
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(!showModal);
  };
  const openModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.propertyContainer}>
      {showModal && <OfferModal handleShow={closeModal} data={property} />}
=======

  return (
    <div className={styles.propertyContainer}>
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
        <div className={styles.property}>
          <Link href={`/buy/search/${property._id}`} className={styles.ImageContainer}>

            <div className={styles.indications}>
              <p style={property.justAddedExpiration === false ? { display: "none" } : null}>{property.justAddedExpiration ? "Just added " : null}</p>
              <FaRegHeart className={styles.heart} />
            </div>



            <img className={styles.image} src={property.images[0]} alt="" />


            <div className={styles.propertyFeatures}>



              <li>
                <img src="/picture.svg" alt="" />
                <p>1/{property?.images.length}</p>
              </li>




              <li>
                <img src="/video.svg" alt="" />
                <p>{property?.options?.videos}</p>
              </li>




              <li>
                <img src="/vr.svg" alt="" />
                <p>{property?.options?.vr}</p>
              </li>



              <li>
                <img src="/floorplan.svg" alt="" />
                <p>{property?.options?.floor_plan}</p>
              </li>





              <li>
                <img src="/360tour.svg" alt="" />
                <p>{property?.options?.virtual_tour}</p>
              </li>



            </div>
          </Link>

          <div className={styles.propertyDetails}>
            <div className={styles.propertyOffer}>

              <p>£{property?.Amount}</p>



<<<<<<< HEAD
  { < button onClick={() => openModal()} > Make an offer</button> }
=======
            {(userType == "property_seeker") && < button > Make an offer</button>}
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731

          </div >

          <div className={styles.propertySize}>

            <li>
              <img src="/bedroom.svg" alt="" />
              <p>{property?.bedrooms}</p>
            </li>




            <li>
              <img src="/bathtub.svg" alt="" />
              <p>{property?.bathrooms}</p>
            </li>



            <li>
              <img src="/chair.svg" alt="" />
              <p>{property?.LivingRoom}</p>
            </li>



            <li>
              <img width={"24"} height={"20"} src="https://img.icons8.com/ios/50/toilet-bowl.png" alt="toilet-bowl" />
              <p>{property?.Toilets}</p>
            </li>


          </div>

          <div className={styles.propertyInfo}>

            <p className={`${styles.name}`}>{property?.Title}</p>




            <p className={styles.location}>{property?.location[1]}</p>



            <p className={`{$styles.desp} line-clamp-5 text-neutral-600`}>{property?.description}</p>



            <p className={styles.listed}>{formattedDate}</p>



          </div>


          <div className={styles.ContactInfo}>
            <img src={property?.company} alt="" />
            <div className={styles.contact}>
              <FiPhone />
              <p></p>
            </div>
            <div className={styles.contact}>
              <TfiEmail />
              <p>Email</p>
            </div>
            <div className={styles.contact}>
              <CiShare2 className={styles.contactIcon} />
              <p></p>
            </div>
          </div>

        </div >


      </div >
    </div >
  )
}


