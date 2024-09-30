import { OfferCard } from "../../../../../components/styled components/OffersCard"
import styles from "../../../../../styles/Transactions/Home.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

const Recieved = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            {/* <OfferCard/> */}
            <Link href="/transactions/agent/offers/"><h2>Offers Recieved</h2></Link>
            <Link href="/transactions/agent/offers/recieved/1">
                <span>Listing ID: 1SFB2436</span>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </Link>
            <Link href="/transactions/agent/offers/recieved/1">
                <span>Listing ID: 1SFB2436</span>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </Link>
            <Link href="/transactions/agent/offers/recieved/1">
                <span>Listing ID: 1SFB2436</span>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </Link>
            <Link href="/transactions/agent/offers/recieved/1">
                <span>Listing ID: 1SFB2436</span>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </Link>
        </div>
    )
}

export default Recieved