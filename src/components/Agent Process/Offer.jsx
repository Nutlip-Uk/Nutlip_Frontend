import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import Button from '../styled components/Button'

export const Offer = () => {
    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Accepted Offer</h2>
                <p><strong>Congratulations!</strong>You have successfully accepted an offer from a buyer for this real estate property.</p>
            </section>

            <section id={styles.transaction}>
                <p><strong>Transaction ID: DASVI123</strong></p>
                
            </section>


            <Button bgcolor="#DA0025" textcolor="#FFF" width="100" content="View Property"/>

            <section id={styles.detials}>
                <div>
                    <h4>Buyer details</h4>
                    <p>Name: Pamela Kaene</p>
                    <p>Location: Manchester</p>
                </div>
                <div>
                    <h4>Agent details</h4>
                    <p>Name: James Rotrigus</p>
                    <p>Agent ID: TWYD731</p>
                </div>

                <div>
                    <h4>Accepted Offer</h4>
                    <p><strong>£696,000</strong></p>
                </div>

                <div>
                    <h4>Nutlip commission</h4>
                    <p><strong>£1,392</strong></p>
                </div>

                <div>
                    <h4>Seller recieves</h4>
                    <p><strong>£694,608</strong></p>
                </div>

            </section>
        </div>
    )
}