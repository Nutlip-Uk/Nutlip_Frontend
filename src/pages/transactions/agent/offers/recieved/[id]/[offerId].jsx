import styles from "../../../../../../styles/Transactions/OfferProcess.module.css"
import { AddConveyancer, Contract, DOC, Deposit, FullPayment, Funds, FundsVerify, NutlipCommission, ResearchSurvey, TransferTitle } from "../../../../../../components/Buyer Process";
import { useRef, useState } from "react";
import { Chat } from "../../../../../../components/styled components/Chat";
import Progress_bar from "../../../../../../components/ProgressBar";
import Image from "next/image";
import Button from "../../../../../../components/styled components/Button";
import { Offer } from "../../../../../../components/Agent Process/Offer";



const AgentProcess = () => {
    const [progress, setProgress] = useState(Math.floor(100/12))
    const count = useRef(1);
  

    const handleChange = () => {
        if (count.current <= 11) {
            setProgress(progress + Math.floor(100/12))
            count.current = count.current +1
            if(count.current === 12) setProgress(100)
        }
    }


    return (
        <div className={styles.container}>

            {count.current !== 12 && <Chat position='fixed' top='70%' right={20}/>}

            <div id={styles.top_bar}>
                <Image src="/logos_google-meet.svg" width={30} height={30} alt=""/>
                <li>Online (2)</li>
                <Button bgcolor="#D0D0D0" textcolor="#000" width="25" content="Cancel"/>
            </div>

            {/* <Con */}
            <Progress_bar bgcolor="#001F6D" progress={progress}  height={30} />

            {/* NOTE: Code to be refactored */}
            { count.current === 1 && <Offer/>}
            { count.current === 2 && <Funds/>}
            { count.current === 3 && <FundsVerify/>}
            { count.current === 4 && <AddConveyancer/>}
            { count.current === 5 && <ResearchSurvey/>}
            { count.current === 6 && <Contract/>}
            { count.current === 7 && <NutlipCommission/>}
            { count.current === 8 && <Deposit/>}
            { count.current === 9 && <DOC/>}
            { count.current === 10 && <FullPayment/>}
            { count.current === 11 && <TransferTitle/>}
            { count.current === 12 && <Success/>}


            {count.current !== 12 &&<div id={styles.page_nav}>
                <button>
                    Completed: <span>Offer Accepted</span>
                </button>
                <button onClick={handleChange}>
                    Next <span>Funds Verification</span>
                </button>
            </div>}

        </div>
    )
}


const Success =() => {
    return (
        <div className={styles.offer} id={styles.success}>
            <Image src="/Group 21539.svg" width={200} height={150} alt='success'/>

            <h2>Congratulation!</h2>

            <p>Transaction complete
            <br/>
            Thank you for using Nutlip</p>
        </div>
    )
}




export default AgentProcess