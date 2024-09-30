import Button from "./Button"
import styles from "../../styles/styled components/OfferCard.module.css"
import Image from "next/image"
import { AgentOffer } from "../Modals/AgentOffer.modal"
import { useContext, useState } from "react"
import { AgentOfferContext } from "../../context/AgentOffer.context"


export const OfferCard = () => {
    const {acceptOffer, setAcceptOffer} = useContext(AgentOfferContext)
    const [showButtons, setShowButtons] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => {
        setShowModal(false)
    }

    const handleButton = () => {
        setAcceptOffer('accept')
        setShowButtons(false)
    }


    // const

    return(
        <div className={styles.container}>
            { showModal && <AgentOffer handler={handleClose}/>}
            <div>
                <h4>£706,000</h4>
                <p>3 bedroom flat for sale</p>
                <p>Navina road, London E8</p>
            </div>
            <hr/>
            <div>
                <p>Offer</p>
                <h4>£696,000</h4>
                <button onClick={() => setShowModal(true)}>Offer details <hr/></button>
            </div>
            <hr/>
            <section>
                <Image src='/images/vector.svg' width={20} height={20} alt='image'/>
                <Image src='/images/ic-baseline-whatsapp.svg' width={20} height={20} alt='image'/>
                <Image src='/images/vuesax-linear-vuesax-linear-sms-2.svg' width={20} height={20} alt='image'/>
            </section>
            <div>
                <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content={acceptOffer === "accept" ? "Accepted !" : "Accept"} action={handleButton} />
                { showButtons && <Button bgcolor="#001F6D" textcolor="#FFF" width="100" content="Hold" />}
                { showButtons && <Button bgcolor="#DA0025" textcolor="#FFF" width="100" content="Decline" />}
            </div>
        </div>
    )
}
