import Image from "next/image"
import styles from "../../styles/Rent/RelatedProperties.module.css"




const RelatedProperties = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h2>Similar Properties</h2>
                <p>Discover similar properties and contact multiple agents in a single step</p>
                <div className={styles.btnContainer}>
                    <button>
                        <Image src="/images/iconamoon-arrow-up-2-light.svg" width={20} height={20} alt="button-image"/>
                    </button>
                    <button>
                        <Image src="/images/iconamoon-arrow-up-2-light-1.svg" width={20} height={20} alt="button-image"/>
                    </button>
                </div>
            </div>

            <div className={styles.property_list}>
                <div className={styles.property}>
                    <Image src="/images/rectangle-552.png" width={200} height={154} alt="image"/>
                    <h2>£ 4560 pcm</h2>
                    <p className={styles.desc}>2 bedroom apartment</p>
                    <p className={styles.location}>Wightmon Road, London</p>
                </div>
                <div className={styles.property}>
                    <Image src="/images/rectangle-553.png" width={200} height={154} alt="image"/>
                    <h2>£ 5660 pcm</h2>
                    <p className={styles.desc}>2 bedroom apartment</p>
                    <p className={styles.location}>Wightmon Road, London</p>
                </div>
                <div className={styles.property}>
                    <Image src="/images/rectangle-554.png" width={200} height={154} alt="image"/>
                    <h2>£ 8760 pcm</h2>
                    <p className={styles.desc}>2 bedroom apartment</p>
                    <p className={styles.location}>Wightmon Road, London</p>
                </div>
            </div>
        </div>
    )
}

export default RelatedProperties