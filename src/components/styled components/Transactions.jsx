import styles from "../../styles/Transactions/Home.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const Transactions = ({offers}) => {
    const router = useRouter()
    return (
       <div className={styles.container}>
            <Link href="#"><h2>Transactions</h2></Link>
            <Link href={offers}>
                <Image src='/icons/transaction.svg' width={20} height={20} alt=""/>
                <h3>Offers</h3>
                <p>Transactions currently ongoing</p>
            </Link>
            <Link href="#">
                <Image src='/icons/completed.svg' width={20} height={20} alt=""/>
                <h3>Completed transactions</h3>
                <p>Transactions completed in full</p>
            </Link>
            <Link href="#">
                <Image src='/icons/cancelled.svg' width={25} height={25} alt=""/>
                <h3>Cancelled transactions</h3>
                <p>Transactions halted</p>
            </Link>
       </div> 
    )
}


export default Transactions