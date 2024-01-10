import styles from "../../styles/Transactions/Home.module.css"
import Image from "next/image"
import { useRouter } from "next/router"

const Transactions = () => {
    const router = useRouter()
    return (
       <div className={styles.container}>
            <h2>Transactions</h2>
            <div onClick={() => router.push('/transactions/current')}>
                <Image src='/images/mdi-bedroom-outline.svg' width={30} height={30} alt=""/>
                <h3>In-progress</h3>
                <p>Transactions currently ongoing</p>
            </div>
            <div>
                <Image src='/images/mdi-bedroom-outline.svg' width={30} height={30} alt=""/>
                <h3>Completed transactions</h3>
                <p>Transactions completed in full</p>
            </div>
            <div>
                <Image src='/images/mdi-bedroom-outline.svg' width={30} height={30} alt=""/>
                <h3>Cancelled transactions</h3>
                <p>Transactions halted</p>
            </div>
       </div> 
    )
}


export default Transactions