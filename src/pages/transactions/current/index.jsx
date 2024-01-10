import styles from "../../../styles/Transactions/Home.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

const Current = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <Link href="#"><h2>In-progress</h2></Link>
            <div onClick={() => router.push('/transactions/current/1')}>
                <span>Listing ID: 1SFB2436</span>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </div>
        </div>
    )
}

export default Current