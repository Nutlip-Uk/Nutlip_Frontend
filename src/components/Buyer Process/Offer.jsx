import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import Button from '../styled components/Button'

export const Offer = () => {
    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Offer Accepted</h2>
                <p><strong>Congratulations!</strong> Your offer has been accepted by the seller. You can now proceed to inviting a Conveyancer that will represent you in this transaction to its completion </p>
            </section>

            <section id={styles.transaction}>
                <p><strong>Transaction ID: DASVI123</strong></p>
                <hr/>
                <p><strong>Actual Price: £706,000</strong></p>
                <hr/>
                <div /* id={styles.facilities} */>
                    <span>
                        <Image src="/images/mdi-bedroom-outline.svg" width={20} height={20} alt="bedroom-thumbnail"/>
                        {/* {props.data.facilities.bedrooms} */}
                    </span>
                    <span>
                        <Image src="/images/mdi-shower.svg" width={20} height={20} alt="bathroom-thumbnail"/>
                        {/* {props.data.facilities.bathrooms} */}
                    </span>
                    <span>
                        <Image src="/images/material-symbols-chair-outline.svg" width={20} height={20} alt="livingroom-thumbnail"/>
                        {/* {props.data.facilities.livingroom} */}
                    </span>
                </div>
                <hr/>
                <div>
                    <p><strong>3 bedroom flat for sale</strong></p>
                    <p>Navina road, London E8</p>
                </div>
            </section>

            <hr/>


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