import styles from "../../styles/BuyerProcess/AddConveyancer.module.css";
import Button from '../styled components/Button';
import { useState } from "react";
import { ConveyancerModal } from "../Modals/Offer.modal";

export const AddConveyancer = ({ userType, transaction }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleBuyerButtonClick = () => {
        setShowModal(true);
    };

    const handleAgentButtonClick = () => {
        setShowModal2(true);
    };

    return (
        <div className={styles.container}>
            {showModal && <ConveyancerModal handler={() => setShowModal(false)} />}
            {showModal2 && <ConveyancerModal handler={() => setShowModal2(false)} />}
            <div className={styles.Header}>
                <h2>Add Conveyancer</h2>
                <p>As your offer has been accepted, please invite a Conveyancer of your choice to become part of the transaction as your representative for a seamless process to completion.</p>
            </div>

            <section className={styles.conveyancerInvite}>
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Buyer Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>
                    <hr />
                    <button
                        className={`${styles.conveyancerButton} ${userType !== "buyer" && styles.disabled}`}
                        onClick={handleBuyerButtonClick}
                        disabled={userType !== "buyer"}
                    >
                        Invite Conveyancer
                    </button>
                    {showModal && (
                        <span className={styles.conveyancerDetails}>
                            <h4>Conveyancer details</h4>
                            <p>Name: Jame Rotrigus</p>
                            <p>Agent ID: WGKK102</p>
                        </span>
                    )}
                </div>
                <hr />
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Agent Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>
                    <hr />
                    <button
                        className={`${styles.conveyancerButton} ${userType !== "agent" && styles.disabled}`}
                        onClick={handleAgentButtonClick}
                        disabled={userType !== "agent"}
                    >
                        Invite Conveyancer
                    </button>
                    {showModal2 && (
                        <span className={styles.conveyancerDetails}>
                            <h4>Conveyancer details</h4>
                            <p>Name: Jame Rotrigus</p>
                            <p>Agent ID: WGKK102</p>
                        </span>
                    )}
                </div>
            </section>
        </div>
    );
};
