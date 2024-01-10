import styles from "../../styles/Transactions/OfferProcess.module.css"
import Button from '../styled components/Button'
import { useState } from "react"
import { ConveyancerModal } from "../Modals/Offer.modal"


export const AddConveyancer = (props) => {
    const [ showModal, setShowModal ] = useState(false) 
    const [ showModal2, setShowModal2 ] = useState(false) 
    const [ showButton, setShowButton ] = useState(true)
    const [ showButton2, setShowButton2 ] = useState(true)

    const closeModal = () => {
        setShowModal(false)
    }

    const closeModal2 = () => {
        setShowModal2(false)
    }

    return(
        <div className={styles.offer}>
            {showModal && <ConveyancerModal handler={closeModal}/>}
            {showModal2 && <ConveyancerModal handler={closeModal2}/>}
            <section>
                <h2>Add Conveyancer</h2>
                <p>As your offer has been accepted, please invite a Conveyancer of your chosen to become part of the transaction as your representative for a seamless process to completion.</p>
            </section>

            <section id={styles.conveyancer_invite}>
                <div>
                    <h3>Buyer Conveyancer</h3>
                    <p>Add your conveyancer by sending them an invite</p>
                    { showButton && <Button action={() => {
                        setShowModal(!showModal)
                        setShowButton(!showButton)}} bgcolor="#DA0025" textcolor="#FFF" width="100" content="Invite Conveyancer"/>}
                    {!showButton && <span>
                        <h4>Conveyancer detials</h4>
                        <p>Name: Jame Rotrigus</p>
                        <p>Agent ID: WGKK102</p>
                    </span>}
                </div>
                <hr/>
                <div>
                    <h3>Agent Conveyancer</h3>
                    <p>Add your conveyancer by sending them an invite</p>
                    {showButton2 && <Button action={() => {
                        setShowModal2(!showModal2)
                        setShowButton2(!showButton2)
                        }} bgcolor="#D0D0D0" textcolor="#626161" width="100" content="Invite Conveyancer"/>
                    }

                    {!showButton2 && <span>
                        <h4>Conveyancer detials</h4>
                        <p>Name: Jame Rotrigus</p>
                        <p>Agent ID: WGKK102</p>
                    </span>}
                </div>
            </section>

        </div>
    )
}