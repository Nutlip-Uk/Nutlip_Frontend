import styles from "../../styles/BuyerProcess/ResearchAndSurvey.module.css"
import Button from "../styled components/Button"

export const ResearchSurvey = () => {
    return (
        <div className={styles.container}>
            <section className={styles.text}>
                <h2>Research and Survey</h2>
                <p>The research and survey for your chosen real estate property have now been completed by your Conveyancer. </p>      
            </section>

            <section className={styles.ResearchInvite}>
                <div className={styles.Research}>
                    <div className={styles.SubHeader}>
                        <h3>Buyer Conveyancer</h3>
                        <p>Confirm your Research by sending them an invite</p>
                    </div>

                    <hr/>
                    <button className={styles.ResearchButton} 
                       >Confirm Research</button>
                    
                </div>
                </section>
        </div>
    )
}
