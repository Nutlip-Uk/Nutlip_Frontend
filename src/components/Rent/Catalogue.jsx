import Image from "next/image"
import styles from "../../styles/Rent/Catalogue.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { CiShare2} from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
// import { rent } from "../utils/properties"
// import { useEffect, useState } from "react"
// import { buy } from "../utils/buyproperties"

import { rent } from "../../utils/properties";




const CatalogueItemImage = (props) => {
    const { arr, options, link } = props
    const router = useRouter()
    return (
        <div className={styles.image}>
            <div>
                <span>Just added</span>
                <button id={styles.save_item}>
                    <Image src="/images/vuesax.svg" width={30} height={25} alt="save-icon" />
                </button>
            </div>
            <Link href={`/${router.pathname}/${link}`}>
                <Image src={arr[0]} width={320} height={300} alt="image"/>
            </Link>

            <div>
                <span>
                    <Image src="/images/frame-42758-system-uicons-picture.svg" width={20} height={20} alt="image-Thumbnail"/>
                    1/{options.pictures}
                </span>
                <span>
                    <Image src="/images/frame-42758-ph-video-light.svg" width={20} height={20} alt="video-thumbnail" />
                    {options.videos}
                </span>
                <span>
                    <Image src="/images/frame-42758-bi-badge-vr_1.svg" width={20} height={20} alt="vr-thumbnail"/>
                    {options.virtual_tour}
                </span>
                <span>
                <Image src="/images/frame-42758-teenyicons-floorplan-solid.svg" width={20} height={20} alt="floor-plan-thumbnail"/>
                    {options.floor_plan}
                </span>
                <span>
                    <Image src="/images/frame-42758-bi-badge-vr_2.svg" width={20} height={20} alt="thumbnail"/>
                    {options.vr}
                </span>
            </div>
        </div>
    )
}


const CatalogueItemDescription = (props) => {
    const { entry } = props
    const {facilities, desc, location, text, listed} = entry
    const router = useRouter()
    const check = router.pathname === '/rent/search'


    return (
        <div className={styles.description}>
            {check ? 
                <h1>
                    £{entry.pcm} pcm
                </h1> : 
                <div id={styles.price}>
                    <h1>
                        £{entry.price}
                    </h1>
                    <button>Make an Offer</button>
                </div>
            }
            {check && <p>
                £{entry.pcw} pw 
                {entry.student_friendly ? <span> Student friendly</span> : null}
            </p>}

            <div id={styles.facilities}>
                <span>
                    <Image src="/images/mdi-bedroom-outline.svg" width={20} height={20} alt="bedroom-thumbnail"/>
                    {facilities.bedrooms}
                </span>
                <span>
                    <Image src="/images/mdi-shower.svg" width={20} height={20} alt="bathroom-thumbnail"/>
                    {facilities.bathrooms}
                </span>
                <span>
                    <Image src="/images/material-symbols-chair-outline.svg" width={20} height={20} alt="livingroom-thumbnail"/>
                    {facilities.livingroom}
                </span>
            </div>

            <div className={styles.header}>
                <h3>{desc}</h3>
                <p>{location}</p>
            </div>

            <p className={styles.text}>
                {text}
            </p>

            <p>
                {listed}
                {router.pathname === '/rent/search' &&<span>
                    <Image src="/images/green-indicator.svg" width={10} height={10} alt=""/>
                    Avaliable from 29th Dec
                </span>}
            </p>

            <div id={styles.contact}>
                <Image src="/images/rectangle-402.svg" width={100} height={31} alt="logo"/>
                <span>
                    <Image src="/images/vector.svg" width={20} height={20} alt="phone"/>
                    Call
                </span>
                <span>
                    <Image src="/images/clarity-email-line.svg" width={20} height={20} alt="email-thumbnail"/>
                    Email
                </span>
                <span>
                    <Image src="/images/solar-share-linear.svg" width={20} height={20} alt="share"/>
                    Share
                </span>
            </div>
        </div>
    )
}

const CatalogueItem = (props) => {
    const { entry } = props
    const { images, options } = entry
    return(
        <div className={styles.item}>
            <CatalogueItemImage arr={images} options={options} link={props.link}/>
            <CatalogueItemDescription entry={props.entry}/>
        </div>
    )
}

const Catalogue = () => {


    return (
        <section className={styles.Section}>
        <div className={styles.container}>
          <div className={styles.gridContainer}>
            {
              rent.map((property) => (
                <Property key={property.id} property={property} />
              ))
            }
          </div>
        </div>
    </section>
    )
}




function Property({property}) {
    const router =  useRouter()
    return (
      <div className={styles.propertyContainer}>
                    <div className={styles.property}>
                      <Link href={`/${router.pathname}/${property.id}`}  className={styles.ImageContainer}>
                        <div className={styles.indications}>
                        <p style={property.just_added === false ? {opacity: 0} : {opacity:1 } }>{property.just_added ? "Just added ":null}</p>
                          <FaRegHeart className={styles.heart}/>
                        </div>
  
                        <img className={styles.image} src={property.images[1]} alt="" />
  
                        <div className={styles.propertyFeatures}>
                         <li>
                          <img src="/picture.svg" alt="" />
                          <p>1/{property.options.pictures}</p>
                         </li>
                         <li>
                          <img src="/video.svg" alt="" />
                          <p>{property.options.videos}</p>
                         </li>
                         <li>
                          <img src="/vr.svg" alt="" />
                          <p>{property.options.vr}</p>
                         </li>
                         <li>
                          <img src="/floorplan.svg" alt="" />
                          <p>{property.options.floor_plan}</p>
                         </li>
                         <li>
                          <img src="/360tour.svg" alt="" />
                          <p>{property.options.virtual_tour}</p>
                         </li>
                        </div>
                      </Link>
  
                      <div className={styles.propertyDetails}>
                          <div className={styles.propertyOffer}>
                            <p>£{property.pcm} pcm</p>
  
                            {/* <button>Make an offer</button> */}
                          </div>
                          <div className={styles.studentFriendly}>
                            <p>£{property.pcw} pcw</p>
  
                            <button>Student Friendly</button>
                          </div>
  
                          <div className={styles.propertySize}>
                            <li>
                              <img src="/bedroom.svg" alt="" />
                              <p>{property.facilities.bedrooms}</p>
                            </li>
                            <li>
                              <img src="/bathtub.svg" alt="" />
                              <p>{property.facilities.bathrooms}</p>
                            </li>
                            <li>
                              <img src="/chair.svg" alt="" />
                              <p>{property.facilities.livingroom}</p>
                            </li>
                            <li>
                            <img width={"24"} height={"20"} src="https://img.icons8.com/ios/50/toilet-bowl.png" alt="toilet-bowl" />
                              <p>{property.facilities.toilets}</p>
                            </li>
                          </div>
  
                          <div className={styles.propertyInfo}>
                              <p className={styles.name}>{property.desc}</p>
                              <p className={styles.location}>{property.location}</p>
                              <p className={styles.desp}>{property.text}</p>
                              <div className={styles.listingContainer}>
                              <p className={styles.listed}>{property.listed}</p>
                              {property.availability ? <div className={styles.availability}><div className={styles.greendot}/>{property.availability}</div> : null}
                              </div>
                          </div>
  
                          <div className={styles.ContactInfo}>
                              <img src={property.company} alt="" />
                              <div className={styles.contact}>
                              <FiPhone />
                              <p>Call</p>
                              </div>
                              <div className={styles.contact}>
                              <TfiEmail />
                              <p>Email</p>
                              </div>
                              <div className={styles.contact}>
                              <CiShare2  className={styles.contactIcon}/>
                              <p>Share</p>
                              </div>
                          </div>
                      </div>
  
  
                    </div>
                </div>
    )
  }
  
  
  


export default Catalogue