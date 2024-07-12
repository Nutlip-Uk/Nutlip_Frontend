import { useState } from "react"
import styles from "../../styles/BuyerProcess/ResearchAndSurvey.module.css"
import Button from "../styled components/Button"

export const ResearchSurvey = ({ userType, transaction ,id}) => {
    const [confirm, setConfirmed] = useState(false)


    const handleConfirm = async () => {
        try {
            const response = await fetch(`/api/transaction/05_researchandsurvey/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ researched:true }),
            });

            if (response.ok) {
                setConfirmed(true);
            }
        } catch (error) {
            console.error('Error confirming research and survey:', error);
        }
    }

    return (
        <>
            {userType === "Buyer_conveyancer" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2>Research and Survey</h2>
                        <p>Now is the time to carry out a thorough Research and Survey of the property</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                <h3>Buyer Conveyancer</h3>
                                <p>Confirm your Research by sending them an invite</p>
                            </div>

                            <hr />
                            <button className={styles.ResearchButton}
                            onClick={()=>handleConfirm()}
                            >Confirm Research</button>
                        </div>
                    </section>
                </div>}
            {userType === "Agent_conveyancer" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2>Research and Survey</h2>
                         <p>The research and survey for the chosen real estate property has now been confirmed by the buyer and his representative</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                {/* <h3>Agent Conveyancer</h3> */}
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {confirm == true ? <button className={styles.ResearchButton}
                            >Confirm Research</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>}


                {
                    userType === "buyer" &&
                    <div className={styles.container}>
                    <section className={styles.text}>
                        <h2>Research and Survey</h2>
                        {confirm == true ? <p>The research and survey for your chosen real estate property have now been completed by your Conveyancer. </p> : <p>The research and survey for the chosen real estate property has now been confirmed by the buyer and his representative</p>}
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                {/* <h3>Agent Conveyancer</h3> */}
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {confirm == true ? <button className={styles.ResearchButton}
                            >Completed</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>
                }
                {
                    userType === "agent" &&
                    <div className={styles.container}>
                    <section className={styles.text}>
                        <h2>Research and Survey</h2>
                         <p>The research and survey of this real estate property is on-going by the Buyer’s Representative.</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                {/* <h3>Agent Conveyancer</h3> */}
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {confirm == true ? <button className={styles.ResearchButton}
                            >Completed</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>
                }
        </>
    )
}
