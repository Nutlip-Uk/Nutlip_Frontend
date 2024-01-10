import Button from "../styled components/Button"
import styles from "../../styles/Transactions/OfferProcess.module.css"


export const NutlipCommission = () => {
    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Nutlip Commission</h2>
                <p>The payment for the commission charged by Nutlip as a facilitator of this transaction has been successfully made. Thank you!</p>

                <p><strong>Amount: £1,392</strong></p>

                <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content="Payment Successful!"/>
            </section>
        </div>
    )
}