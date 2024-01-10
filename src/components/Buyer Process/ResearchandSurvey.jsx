import styles from "../../styles/Transactions/OfferProcess.module.css"
import Button from "../styled components/Button"

export const ResearchSurvey = () => {
    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Research and Survey</h2>
                <p>The research and survey for your chosen real estate property have now been completed by your Conveyancer. </p>

                <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content="Completed!"/>
            </section>
        </div>
    )
}
