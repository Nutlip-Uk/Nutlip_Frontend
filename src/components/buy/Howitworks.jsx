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
                            <p>Your Path to Homeownership using Nutlip</p>
                        </div>

                        <div className={styles.TimelineContainer}>
                            <Timeline
                                items={[
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'Browse listed properties on Nutlip and choose the one you want.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'Submit your offer easily online.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'Once accepted, provide proof of funds through Nutlip.',
                                    },

                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: 'Add your Conveyancer and any other parties to the transaction online.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "red" }} />,
                                        children: ' Exchange contracts and complete your purchase smoothly.',
                                    },
                                    {
                                        dot: <div className="" style={{ height: "16px", width: "16px", backgroundColor: "transparent" }} />,
                                        children: ' ',
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

