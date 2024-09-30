import { useContext, useState } from "react"
import styles from "../../styles/BuyerProcess/ResearchAndSurvey.module.css"
import Button from "../styled components/Button"
import { LoginContext } from "../../context/Login.context"
import { useImageContext } from "../../context/ImageContext.context"

export const ResearchSurvey = ({ userType, transaction, id, transactionContent, handleBackClick, handleNextClick, currentStage, transactionNames }) => {
    const [confirm, setConfirmed] = useState(false)
    const { setLoading } = useImageContext();

    const { userInformation } = useContext(LoginContext);


    const handleConfirm = async () => {
        setLoading(true);
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
                setLoading(false);
            }

        } catch (error) {
            console.error('Error confirming research and survey:', error);
            setLoading(false);
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
                </div>
            }


            {userType === "conveyancer_seller" &&
                <div className={styles.container}>
                    <section className={styles.text}>
                        <h2 className="text-2xl font-bold">Research and Survey</h2>
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



            <div className="flex gap-4 justify-between w-full" id="page_nav">
                <button
                    onClick={handleBackClick}
                    disabled={currentStage === 0}
                    className={`flex items-center gap-2 text-black border-b border-black text-base font-medium ${currentStage === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                >
                    Back
                </button>

                <button
                    onClick={handleNextClick}
                    disabled={(userType === "conveyancer_buyer" || userType === "property_seeker" || userType === "Real_estate_agent")
                        && (!transactionContent?.contract_upload_unsigned_seller)}
                    className={`flex items-center border-b gap-2 text-base font-medium ${currentStage >= transactionNames?.length - 1
                        ? 'cursor-not-allowed opacity-50 text-gray-600 border-gray-600'
                        : !transactionContent?.contract_upload_unsigned_seller && (userType === "conveyancer_buyer" || userType === "property_seeker" || userType === "Real_estate_agent")
                            ? 'cursor-pointer opacity-25 text-gray-600 border-gray-600'
                            : 'cursor-not-allowed  text-red-600 border-red-600'
                        }`}
                >
                    Next : <span>{"Contract Upload"}</span>
                </button>
            </div >





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