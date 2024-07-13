import styles from "../../styles/BuyerProcess/AddConveyancer.module.css";
import Button from '../styled components/Button';
import { useState } from "react";
import { ConveyancerModal } from "../Modals/Offer.modal";

export const AddConveyancer = ({ userType, transaction ,id,userInformation}) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleBuyerButtonClick = () => {
        setShowModal(true);
    };

    const handleAgentButtonClick = () => {
        setShowModal2(true);
    };


 const [conveyancers, setConveyancers] = useState([]);

  const getConveyancers = async () => {
    try {
      const response = await fetch('/api/user/getallconvenyancers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: id,  // Replace with actual transaction ID
          userid:userInformation?.user?.id  // Replace with actual user ID
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConveyancers(data.conveyancers);
        console.log('Conveyancers:', data.conveyancers);
      } else {
        const errorData = await response.json();
        console.error('Error fetching conveyancers:', errorData.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
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
                        className={`${styles.conveyancerButton} ${userType !== "property_seeker" && styles.disabled}`}
                        onClick={handleBuyerButtonClick}
                        disabled={userType !== "property_seeker"}
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
                        className={`${styles.conveyancerButton} ${userType !== "Real_estate_agent" && styles.disabled}`}
                        onClick={handleAgentButtonClick}
                        disabled={userType !== "Real_estate_agent"}
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


                <div>
      <button onClick={getConveyancers}>Get Conveyancers</button>
      <ul>
        {conveyancers.map((conveyancer) => (
          <li key={conveyancer._id}>{conveyancer.conveyancers[0].name}</li>
        ))}
      </ul>
    </div>
            </section>
        </div>
    );
};
