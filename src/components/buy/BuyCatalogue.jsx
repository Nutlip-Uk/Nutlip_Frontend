import styles from "../../styles/buy/Buycatelogue.module.css"
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { buy } from './../../utils/buyproperties';
import { useRouter } from "next/router"
import Link from 'next/link';
import { useState, useEffect } from "react";
import Skeleton from '@mui/joy/Skeleton';


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
  return (
    <div className={styles.propertyContainer}>
      <div className={styles.property}>
        <Link href={`/buy/search/${property._id}`} className={styles.ImageContainer}>
          <Skeleton loading={isLoading} variant="overlay">
            <div className={styles.indications}>
              <p style={property.justAddedExpiration === false ? { display: "none" } : null}>{property.justAddedExpiration ? "Just added " : null}</p>
              <FaRegHeart className={styles.heart} />
            </div>
          </Skeleton>

          <Skeleton loading={isLoading} variant="overlay">
            <img className={styles.image} src={property.images[0]} alt="" />
          </Skeleton>

          <div className={styles.propertyFeatures}>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>

              <li>
                <img src="/picture.svg" alt="" />
                <p>1/{property?.images.length}</p>
              </li>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>

              <li>
                <img src="/video.svg" alt="" />
                <p>{property?.options?.videos}</p>
              </li>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>

              <li>
                <img src="/vr.svg" alt="" />
                <p>{property?.options?.vr}</p>
              </li>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <li>
                <img src="/floorplan.svg" alt="" />
                <p>{property?.options?.floor_plan}</p>
              </li>
            </Skeleton>


            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>

              <li>
                <img src="/360tour.svg" alt="" />
                <p>{property?.options?.virtual_tour}</p>
              </li>

            </Skeleton>

          </div>
        </Link>

        <div className={styles.propertyDetails}>
          <div className={styles.propertyOffer}>
            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <p>£{property?.Amount}</p>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <button>Make an offer</button>
            </Skeleton>
          </div>

          <div className={styles.propertySize}>
            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <li>
                <img src="/bedroom.svg" alt="" />
                <p>{property?.bedrooms}</p>
              </li>

            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <li>
                <img src="/bathtub.svg" alt="" />
                <p>{property?.bathrooms}</p>
              </li>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <li>
                <img src="/chair.svg" alt="" />
                <p>{property?.LivingRoom}</p>
              </li>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <li>
                <img width={"24"} height={"20"} src="https://img.icons8.com/ios/50/toilet-bowl.png" alt="toilet-bowl" />
                <p>{property?.Toilets}</p>
              </li>
            </Skeleton>

          </div>

          <div className={styles.propertyInfo}>
            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <p className={styles.name}>{property?.Title}</p>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>

              <p className={styles.location}>{property?.location}</p>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <p className={styles.desp}>{property?.description.slice(0, 30)}</p>
            </Skeleton>

            <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
              <p className={styles.listed}>{formattedDate}</p>
            </Skeleton>


          </div>

          <Skeleton className="relative w-1/2" loading={isLoading} height={"100%"}>
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
          </Skeleton>
        </div>


      </div>
    </div>
  )
}


