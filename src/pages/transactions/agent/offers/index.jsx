import styles from "../../../../styles/Transactions/Home.module.css"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"



const AgentOffers = ({url}) => {
    return(
        
        <div className={styles.container}>
            <Link href="#"><h2>Offers</h2></Link>
            <Link href="/transactions/agent/offers/recieved">
                <Image src='/icons/recieved.svg' width={20} height={20} alt=""/>
                <h3>Offers received</h3>
                <p>Transactions currently ongoing</p>
            </Link>
            <Link href="/transactions/agent/offers/accepted">
                <Image src='/icons/accepted.svg' width={20} height={20} alt=""/>
                <h3>Offers accepted</h3>
                <p>Transactions completed in full</p>
            </Link>
            <Link href="#">
                <Image src='/icons/on-hold.svg' width={25} height={25} alt=""/>
                <h3>Offers in hold</h3>
                <p>Transactions halted</p>
            </Link>
            <Link href="#">
                <Image src='/icons/cancelled.svg' width={25} height={25} alt=""/>
                <h3>Offers declined</h3>
                <p>Transactions halted</p>
            </Link>
       </div> 
    )
}


export default AgentOffers