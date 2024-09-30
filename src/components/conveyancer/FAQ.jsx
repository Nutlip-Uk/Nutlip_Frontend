import styles from "../../styles/Conveyancer/FAQ.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.Header}>
          <p>Frequently Asked Questions</p>
        </div>

        <div className={styles.AccordionContainer}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.typography}>
                What Does a Conveyancer Do?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
{"            A conveyancer is a legal professional responsible for facilitating property transactions. They handle tasks such as property searches, contract preparation, and liaising with relevant parties like the seller's or buyer's solicitor. Their  role is to ensure that the property's ownership is transferred correctly and all legal requirements are met."}              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={styles.typography}>
                How Much Does Conveyancing Cost?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
{"              The cost of conveyancing can vary based on factors like the property's value, location, and the complexity of the transaction. Typically, you can expect to pay for the conveyancer's professional fees, search fees, and additional disbursements. Conveyancers often provide a transparent breakdown of these costs upfront, allowing you to budget accordingly."}              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={styles.typography}>
                What Qualifications Should I Look for in a Conveyancer?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Look for conveyancers who are legally qualified, typically
                solicitors or licensed conveyancers, and are authorized to
                practice property law in your jurisdiction. Experience and local
                expertise are also beneficial qualities to consider.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={styles.typography}>
                Can I Use the Same Conveyancer as the Seller/Buyer?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordiondetails}>
              <Typography>
{"              While it's technically possible for both parties to use the same conveyancer, it's generally discouraged as it can present a conflict of interest. Each party should have independent legal representation to ensure their best interests are protected."}              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
