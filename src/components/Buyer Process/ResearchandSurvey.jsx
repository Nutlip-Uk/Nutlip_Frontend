import { useContext, useState } from "react"
import styles from "../../styles/BuyerProcess/ResearchAndSurvey.module.css"
import Button from "../styled components/Button"
import { LoginContext } from "../../context/Login.context"

export const ResearchSurvey = ({ userType, transaction, id, transactionContent }) => {
    const [confirm, setConfirmed] = useState(false)


    const { userInformation } = useContext(LoginContext);


    const handleConfirm = async () => {
        try {
            const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_researchandsurvery_05`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                }),
            });

            if (response.ok) {
                setConfirmed(true);
                const data = await response.json();
                console.log(data); // Log the response
            }

        } catch (error) {
            console.error('Error confirming research and survey:', error);
        }
    }




    return (
        <>
            {
                userType === "property_seeker" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2 className="text-2xl font-bold">Research and Survey</h2>
                        {transactionContent?.researched ? <p>The research and survey for your chosen real estate property have now been completed by your Conveyancer. </p> : <p>The research and survey for the chosen real estate property has now been confirmed by the buyer and his representative</p>}
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                {/* <h3>Agent Conveyancer</h3> */}
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {transactionContent?.researched ? <button className={`${styles.ResearchButton} `} style={{ backgroundColor: "#18A030" }}
                            >Completed</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>
            }


            {
                userType === "Real_estate_agent" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2 className="text-2xl font-bold">Research and Survey</h2>
                        <p>The research and survey of this real estate property is on-going by the Buyer’s Representative.</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                {/* <h3>Agent Conveyancer</h3> */}
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {transactionContent?.researched ? <button className={styles.ResearchButton} style={{ backgroundColor: "#18A030" }}
                            >Completed</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>
            }



            {userType === "conveyancer_buyer" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2 className="text-2xl font-bold">Research and Survey</h2>
                        <p>Now is the time to carry out a thorough Research and Survey of the property</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                <h3>Buyer Conveyancer</h3>
                                <p>Confirm your Research by sending them an invite</p>
                            </div>

                            <hr />
                            {!transactionContent?.researched ? <button className={styles.ResearchButton}
                                onClick={() => handleConfirm()}
                            >Confirm Research</button> : <button style={{ background: "green" }} className={styles.ResearchButton}>Research Confirmed</button>}
                        </div>
                    </section>
                </div>}
            {userType === "conveyancer_seller" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2>Research and Survey</h2>
                        <p>The research and survey for the chosen real estate property has now been confirmed by the buyer and his representative</p>
                    </section>

                    <section className={styles.ResearchInvite}>
                        <div className={styles.Research}>
                            <div className={styles.SubHeader}>
                                <h3>Seller Conveyancer</h3>
                                {/* <p>Confirm your Research by sending them an invite</p> */}
                            </div>

                            <hr />
                            {transactionContent?.researched ? <button style={{ background: "green" }} className={styles.ResearchButton}
                            >Research Confirmed</button> : <button className={styles.ResearchButton}>Pending..</button>}
                        </div>
                    </section>
                </div>

            }





        </>
    )
}

const CouldntCommentOUT = () => {
    return (
        <>

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