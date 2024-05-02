/* eslint-disable react/no-unescaped-entities */
import styles from "../../styles/Modals/AgentOfferModal.module.css"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
// import Button from '../styled components/Button';



export const AgentOffer = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className={styles.container}>

            <div className={styles.inner_container}>
                <div className={styles.header}>
                    <h2>Offer details</h2>
                    <button onClick={props.handler}>
                        <Image src='/images/vector-close.svg' width={18} height={18} alt='thumbnail'/>
                    </button>
                </div>

                <section>
                    <p>Are you really intersted in this property?</p>
                    <span><input type="radio"/>Yes</span>
                </section>

                <section>
                    <p>Have you viewed this property?</p>
                    <span><input type="radio"/>Yes</span>
                </section>

                <section>
                    <p>What are you offering</p>
                    <span>£ 696,000</span>
                </section>

                <section>
                    <p>Nutlip commission</p>
                    <span>£ 1,392</span>
                </section>

                <section>
                    <p>Agent/Seller recieves</p>
                    <span>£ 694,608</span>
                </section>

                <section>
                    <p>What's your payment method</p>
                    <span>Cash</span>
                </section>


            </div>


        </div>
    )
}

// export const Success =() => {
//     return (
//         <div className={styles.success}>
//             <Image src="/Group 21539.svg" width={200} height={150} alt='success'/>

//             <h2>Successful</h2>

//             <p>Congratulations!! You’ve successfully made an offer on your preferred property. <strong>What’s next? </strong>
//             <br/>
//             Your offer will either be <strong>accepted, put on hold </strong> or <strong>declined</strong></p>

//             <div>
//                 <button>Need Conveyancer?</button>
//                 <button>Go Back</button>
//             </div>
//         </div>
//     )
// }