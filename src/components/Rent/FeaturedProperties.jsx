import styles from "../../styles/Rent/FeaturedProperties.module.css"
import { MdOutlineArrowOutward } from "react-icons/md";

export default function FeaturedProperties() {
  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.HeaderContainer}>
        <div className={styles.Header}>
            <p>Featured Properties</p>
        </div>
        <div className={styles.SubHeader}>
            <p>Our user-friendly website and mobile app feature an intuitive </p>
            <button>See more <MdOutlineArrowOutward /></button>
        </div>
        </div>

        <div className={styles.BoxContainer}>
            <Box/>
            <Box/>
            <Box/>
            <Box/>
           
        </div>

        
      </div>
    </section>
  )
}

const Box =()=>{
    return(
        <>
            <div className={styles.Box}>
                <div className={styles.BoxImg}>
                    <img src="/rent/featured.png" />
                </div>
                <div className={styles.BoxInfo}>
                <div className={styles.PriceCon}>
                    <p>£5,000 pcm</p>
                    <button className={styles.Icon}>
                        <img src="/rent/heart.svg"/>
                    </button>
                </div>

                <p className={styles.name}>3 bedroom apartment</p>
                <p className={styles.location}>Wightman Road, London</p>
                </div>
            </div>
        </>
    )
}