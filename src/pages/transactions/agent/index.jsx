import Transactions from "../../../components/styled components/Transactions"
import styles from "../../../styles/Transactions/Home.module.css"
import Image from "next/image"
import { useRouter } from "next/router"

const Agent = () => {
    const router = useRouter()
    return (
       <Transactions offers="/transactions/agent/offers"/> 
    )
}


export default Agent