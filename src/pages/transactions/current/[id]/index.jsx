/* eslint-disable react/no-unescaped-entities */
import {
  AddConveyancer,
  Contract,
  DOC,
  Deposit,
  FullPayment,
  Funds,
  FundsVerify,
  NutlipCommission,
  Offer,
  ResearchSurvey,
  TransferTitle,
} from "../../../../components/Buyer Process";
import { Chat } from "../../../../components/styled components/Chat";
import Progress_bar from "../../../../components/ProgressBar";
import Button from "../../../../components/styled components/Button";
import styles from "../../../../styles/Transactions/OfferProcess.module.css";
import Image from "next/image";
import { useRef, useState } from "react";

const Process = () => {
  const [progress, setProgress] = useState(Math.floor(100 / 12));
  const count = useRef(1);

  const handleChange = () => {
    if (count.current <= 11) {
      setProgress(progress + Math.floor(100 / 12));
      count.current = count.current + 1;
      if (count.current === 12) setProgress(100);
    }
  };

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        {count.current !== 12 && <Chat position="fixed" top="90%" right={20} />}

        <div id={styles.top_bar}>
          <div className={styles.rightSide}>
            <div className={styles.googlemeet}>
              <Image
                src="/logos_google-meet.svg"
                width={30}
                height={30}
                alt=""
              />
              <p>Google meet</p>
            </div>

            <li>Online (2)</li>

            <div className={styles.TransactionId}>
              <p>
                <span>Transaction</span> ID: ZVHAVHSV
              </p>
            </div>
          </div>

          <button className={styles.CancelTransaction}>
            Cancel <span>Transaction</span>
          </button>
        </div>

        {/* <Con */}
        <Progress_bar bgcolor="#001F6D" progress={progress} height={30} />

        {/* NOTE: Code to be refactored */}
        {count.current === 1 && <Offer />}
        {count.current === 2 && <Funds />}
        {count.current === 3 && <FundsVerify />}
        {count.current === 4 && <AddConveyancer />}
        {count.current === 5 && <ResearchSurvey />}
        {count.current === 6 && <Contract />}
        {count.current === 7 && <NutlipCommission />}
        {count.current === 8 && <Deposit />}
        {count.current === 9 && <DOC />}
        {count.current === 10 && <FullPayment />}
        {count.current === 11 && <TransferTitle />}
        {count.current === 12 && <Success />}

        {count.current !== 12 && (
          <div id={styles.page_nav}>
            <button>
              Completed: <span>Offer Accepted</span>
            </button>
            <button onClick={handleChange}>
              Next : <span>Funds Verification</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div className={styles.offer} id={styles.success}>
      <img src="/buyerprocess/success.png"  alt="success" />
      <div className={styles.successText}>
        <h2>Congratulation</h2>
        <p>Transaction complete</p>
      </div>
    </div>
  );
};

export default Process;
