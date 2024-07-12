import Button from "../styled components/Button"
import styles from "../../styles/BuyerProcess/commission.module.css"


export const NutlipCommission = ({ userType, transaction, apartment,id }) => {
    const [confirmed, setConfirmed] = useState(false);


    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/transaction/07_nutlippaymentcommision/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ payment_of_nutlip_commision:true }),
            });

            if (response.ok) {
                setConfirmed(true);
            }
        } catch (error) {
            console.error('Error submitting proof of funds:', error);
        }
    }
    return (
        <>
            {userType == "Buyer_conveyancer" && <div className={styles.offer}>
                <div className={styles.text}>
                    <h2>Nutlip Commission Payment</h2>
                    <p>Thank you for your interest in purchasing this Real Estate property. Please make the commission payment to Nutlip for facilitating this transaction.</p>
                    <br />
                    <strong>Amount : {transaction?.offer?.NutlipCommission} </strong>
                </div>

                <div className={styles.paymentContainer}>
                    <div className={styles.debitCard}>
                        <img src="/buyerprocess/debitcards.png" alt="debit cards" />
                        <button><em>Payment via debit card</em></button>
                    </div>

                    <button className={styles.blockChain}><em>Payment via Blockchain</em></button>
                </div>
            </div>
            }

            {userType == "Agent_conveyancer" && <div className={styles.offer}>
                <div className={styles.text}>
                    <h2>Nutlip Commission Payment</h2>
                    {confirmed ? <p>The payment for the commission charged by Nutlip as a facilitator of this transaction has been successfully made. Thank you!</p> : <p>The buyer's conveyancer has not made the commission payment yet.</p>}
                    <br />
                    <strong>Amount : {transaction?.offer?.NutlipCommission} </strong>
                </div>

                <div className={styles.paymentContainer}>
                   {confirm ? <button>Payment Confirmed</button> : <button>Pending..</button>}
                </div>
            </div>
            }
            {userType == "buyer" && <div className={styles.offer}>
                <div className={styles.text}>
                    <h2>Nutlip Commission Payment</h2>
                    {confirmed ? <p>The payment for the commission charged by Nutlip as a facilitator of this transaction has been successfully made. Thank you!</p> : <p>The buyer's conveyancer has not made the commission payment yet.</p>}
                    <br />
                    <strong>Amount : {transaction?.offer?.NutlipCommission} </strong>
                </div>

                <div className={styles.paymentContainer}>
                   {confirm ? <button>Payment Confirmed</button> : <button>Pending..</button>}
                </div>
            </div>
            }
            {userType == "agent" && <div className={styles.offer}>
                <div className={styles.text}>
                    <h2>Nutlip Commission Payment</h2>
                    {confirmed ? <p>The payment for the commission charged by Nutlip as a facilitator of this transaction has been successfully made. Thank you!</p> : <p>The buyer's conveyancer has not made the commission payment yet.</p>}
                    <br />
                    <strong>Amount : {transaction?.offer?.NutlipCommission} </strong>
                </div>

                <div className={styles.paymentContainer}>
                   {confirm ? <button>Payment Confirmed</button> : <button>Pending..</button>}
                </div>
            </div>
            }


        </>
    )
}