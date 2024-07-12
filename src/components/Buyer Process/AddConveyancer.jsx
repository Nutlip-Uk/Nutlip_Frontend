import styles from "../../styles/BuyerProcess/AddConveyancer.module.css"
import Button from '../styled components/Button'
import { useState } from "react"
import { ConveyancerModal } from "../Modals/Offer.modal"


export const AddConveyancer = ({ userType, transaction,id }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [conveyancer, setConveyancer] = useState(null);

    const handleBuyerButtonClick = () => {
        setShowModal(true);
    };

    const handleAgentButtonClick = () => {
        setShowModal2(true);
    };

    const handleConveyancerInvite = async() => {

        if (userType == "buyer") {
            try {
                const response = await fetch(`/api/transaction/03_buyeraddconvenyancer/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ convenyancer_seller }),
                });
    
                if (response.ok) {
                    console.log("Conveyancer invited successfully");
                } else {
                    console.error("Error inviting conveyancer");
                }
            } catch (error) {
                console.error("Error inviting conveyancer:", error);
            }
        }

        if (userType == "agent") {
            try {
                const response = await fetch(`/api/transaction/03_selleraddconvenyancer/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ convenyancer_seller }),
                });
    
                if (response.ok) {
                    console.log("Conveyancer invited successfully");
                } else {
                    console.error("Error inviting conveyancer");
                }
            } catch (error) {
                console.error("Error inviting conveyancer:", error);
            }
        }
    }

    return(
        <div className={styles.container}>
            {showModal && <ConveyancerModal handleConveyancerInvite={handleConveyancerInvite}   handler={() => setShowModal(false)} />}
            {showModal2 && <ConveyancerModal handleConveyancerInvite={handleConveyancerInvite} handler={() => setShowModal2(false)} />}
            <div className={styles.Header}>
                <h2>Add Conveyancer</h2>
                <p>As your offer has been accepted, please invite a Conveyancer of your chosen to become part of the transaction as your representative for a seamless process to completion.</p>
            </div>

            <section className={styles.conveyancerInvite}>
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Buyer Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>

                    <hr/>
                    { showButton && <button className={styles.conveyancerButton} onClick={() => {
                        setShowModal(!showModal)
                        setShowButton(!showButton)}} >Invite Conveyancer</button>}
                    {!showButton && <span className={styles.conveyancerDetails}>
                        <h4>Conveyancer details</h4>
                        <p>Name: Jame Rotrigus</p>
                        <p>Agent ID: WGKK102</p>
                    </span>}
                </div>
                <hr/>
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Agent Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>
                    <hr/>
                    {showButton2 && <button className={styles.conveyancerButton} onClick={() => {
                        setShowModal2(!showModal2)
                        setShowButton2(!showButton2)
                        }}>Invite Conveyancer</button>
                    }

                    {!showButton2 && <span className={styles.conveyancerDetails}>
                        <h4>Conveyancer details</h4>
                        <p>Name: Jame Rotrigus</p>
                        <p>Agent ID: WGKK102</p>
                    </span>}
                </div>
            </section>

        </div>
    )
}