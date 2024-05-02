import styles from "../../../styles/Transactions/inProgress.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

const Current = () => {
    const router = useRouter()
    return (
       <div className={styles.Section}>
         <div className={styles.container}>
            <Link href="#" className={styles.Header}><h2>In-progress</h2></Link>
           <div className={styles.ListContainer}>
           <div className={styles.ListBox} onClick={() => router.push('/transactions/current/1')}>
                <span className={styles.ListingId}>Listing ID: 1SFB2436</span>
                <h4 className={styles.ListPrice}>£706,000</h4>
                <p className={styles.Desc}>3 bedroom flat for sale</p>
                <p className={styles.Location}>Navina road, London E8</p>
            </div>
           </div>
        </div>
       </div>
    )
}

export default Current