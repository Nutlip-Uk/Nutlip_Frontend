import Button from "../styled components/Button"
import styles from "../../styles/BuyerProcess/commission.module.css"


export const NutlipCommission = () => {

    const HandleConfirm = async () => {
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_nutlippayment_07`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Successfully Confirmed message
            }
        } catch (error) {
            console.error('Error Confirming Payment:', error);
        }
    }

    return (
        <div className={styles.offer}>
            <div className={styles.text}>
                <h2>Nutlip Commission Payment</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Document should be maximum of 2MB in these formats; png, jpg, pdf or doc.</p>
            </div>

            <div className={styles.paymentContainer}>
                <div className={styles.debitCard}>
                    <img src="/buyerprocess/debitcards.png" alt="debit cards" />
                    <button><em>Payment via debit card</em></button>
                </div>

                <button className={styles.blockChain}><em>Payment via Blockchain</em></button>
            </div>
        </div>
    )
}