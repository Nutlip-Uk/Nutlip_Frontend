import styles from "../../styles/buy/Buycatelogue.module.css"
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { CiShare2} from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { buy } from './../../utils/buyproperties';
import { useRouter } from "next/router"
import Link  from 'next/link';


export const BuyCatalogue = () => {


  return (
    <section className={styles.Section}>
        <div className={styles.container}>
          <div className={styles.gridContainer}>
            {
              buy.map((property) => (
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
                      <p style={property.just_added === false ? {opacity: 0} : null}>{property.just_added ? "Just added ":null}</p>
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
                          <p>£{property.price}</p>

                          <button>Make an offer</button>
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
                            <p className={styles.listed}>{property.listed}</p>
                        </div>

                        <div className={styles.ContactInfo}>
                            <img src={property.company} alt="" />
                            <div className={styles.contact}>
                            <FiPhone />
                            <p></p>
                            </div>
                            <div className={styles.contact}>
                            <TfiEmail />
                            <p>Email</p>
                            </div>
                            <div className={styles.contact}>
                            <CiShare2  className={styles.contactIcon}/>
                            <p></p>
                            </div>
                        </div>
                    </div>


                  </div>
              </div>
  )
}


