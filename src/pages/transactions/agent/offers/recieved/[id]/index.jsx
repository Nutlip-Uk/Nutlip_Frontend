import styles from "../../../../../../styles/Transactions/OfferProcess.module.css"
import { OfferCard } from "../../../../../../components/styled components/OffersCard"
import { useContext, useRef, useState } from "react";
import { Chat } from "../../../../../../components/styled components/Chat";
import Progress_bar from "../../../../../../components/ProgressBar";
import Image from "next/image";
import Button from "../../../../../../components/styled components/Button";
import Link from "next/link";
import { AgentOfferContext } from "../../../../../../context/AgentOffer.context";



const AgentProcess = () => {

    const {acceptOffer} = useContext(AgentOfferContext)

    return (
        <div className={styles.container}>

            <OfferCard/>

            {/* count.current !== 12 && */<div id={styles.page_nav_2}>
                {/* <button>
                    Completed: <span>Offer Accepted</span>
                </button> */}
                {acceptOffer === "accept" && <Link href="/transactions/agent/offers/received/1/1">
                    Next
                </Link>}
            </div>}

        </div>
    )
}


export default AgentProcess