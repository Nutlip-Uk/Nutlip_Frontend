import Image from 'next/image'
import styles from "../../styles/BuyerProcess/offerAccepted.module.css"
import Button from '../styled components/Button'

export const Offer = () => {
    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Offer Accepted</h2>
                <p><strong>Congratulations!</strong> Your offer has been accepted by the seller. You can now proceed to inviting a Conveyancer that will represent you in this transaction to its completion </p>
            </section>

            <section className={styles.transaction}>
                <div className={styles.transactionId}>
                    <p>Transaction ID</p>
                    <strong> DASVI123</strong>
                </div>

                <hr/>
                <div className={styles.transactionPrice}>
                    <p>Actual Price</p>
                    <strong> £706,000</strong>
                </div>
                <hr/>
                <div  className={styles.facilities} >
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
                <div className={styles.transactionDesc}>
                    <p><strong>3 bedroom flat for sale</strong></p>
                    <p>Navina road, London E8</p>
                </div>
                <hr/>
                <button className={styles.viewProperty}>View Property</button>
            </section>

            <hr className={styles.Line}/>

    
           <section className={styles.details}>
                <div>
                    <h4>Buyer details</h4>
                    <div className={styles.detailsDesc}>
                        <p>Name: Pamela Kaene</p>
                        <p>Location: Manchester</p>
                    </div>
                </div>
                <div>
                    <h4>Agent details</h4>
                    <div className={styles.detailsDesc}>
                    <p>Name: James Rotrigus</p>
                    <p>Agent ID: TWYD731</p>
                    </div>
                </div>

                <div>
                    <h4>Accepted Offer</h4>
                    <p className={styles.DetailsPrice}><strong>£696,000</strong></p>
                </div>

                <div>
                    <h4>Nutlip commission</h4>
                    <p className={styles.DetailsPrice}><strong>£1,392</strong></p>
                </div>

                <div>
                    <h4>Seller recieves</h4>
                    <p className={styles.DetailsPrice}><strong>£694,608</strong></p>
                </div>

            </section>
        </div>
    )
}