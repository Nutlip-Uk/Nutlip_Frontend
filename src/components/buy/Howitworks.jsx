import React from 'react'
import { Timeline } from 'antd';
import styles from "../../styles/buy/Howitworks.module.css"

const Howitworks = () => {
    return (
        <>
            <section className={styles.Section}>
                <div className={styles.Container}>
                    <div className={styles.imgContainer}>
                        <img src="/buy/howitworks.png" alt="" />
                    </div>

                    <div className={styles.TextContainer}>
                        <div className={styles.Header}>
                            <p>How it Works</p>
                            <p>Discover the Steps to Finding Your Perfect Rental Home</p>
                        </div>

                        <div className={styles.TimelineContainer}>
                            <Timeline
                                items={[
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'A private seller lists a property on the platform.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'A buyer makes an electronic offer on the property',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'The seller electronically accepts the offer',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'The buyer electronically provides proof of funds.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'Conveyancers and additional parties are electronically added to the transaction, and a 0.5% transaction fee is paid to Nutlip upon contract exchange, leading to completion.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "transparent" }} />,
                                        children: '',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Howitworks

