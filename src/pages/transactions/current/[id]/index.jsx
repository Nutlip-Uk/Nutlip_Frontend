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
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginContext } from '../../../../context/Login.context';

const Process = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(1); // To handle rendering from stage 1
  const router = useRouter();
  const { id } = router.query;

  const [transaction, setTransaction] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [transactionStage, setTransactionStage] = useState(1);
  const [sellerInfo, setSellerInfo] = useState([]);
  const [userType, setUserType] = useState(null);
  const { userInformation } = useContext(LoginContext);
  const [transactionContent, setTransactionContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/transaction/gettxcontent/${id}`);
      const data = await response.json();
      setTransactionContent(data.transactioncontent);
      console.log("TRANSACTION CONTENT", transactionContent);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const transactionResponse = await fetch(`/api/transaction/${id}`);
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData.transaction);
        setTransactionStage(transactionData.transaction.transactionCurrentStage);

        if (transactionResponse.ok) {
          const apartmentResponse = await fetch(`/api/apartment/${transactionData.transaction.ApartmentId}`);
          const apartmentData = await apartmentResponse.json();
          setApartment(apartmentData);

          const sellerResponse = await fetch(`/api/user/${userInformation.user.id}`);
          const sellerData = await sellerResponse.json();
          setSellerInfo(sellerData);
          setUserType(sellerData.userType.type);
        } else {
          console.error("API error:", transactionData.message);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setProgress((currentStage / 12) * 100);
  }, [currentStage]);

  const handleNextClick = () => {
    if (currentStage < transactionStage) {
      setCurrentStage(currentStage + 1);
    } else {
      console.log('Cannot progress to the next stage until the current Transaction stage is completed.');
    }
  };

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        {currentStage !== 11 && <Chat position="fixed" top="90%" right={20} />}

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
              <p style={{ textTransform: "uppercase" }}>
                <span style={{ textTransform: "Capitalize" }}>Transaction ID:</span>)
                {id && id?.slice(0, 8)}
              </p>
            </div>
          </div>

          <button className={styles.CancelTransaction}>
            Cancel <span>Transaction</span>
          </button>
        </div>

        <Progress_bar bgcolor="#001F6D" progress={progress} height={30} />

        {/* Render components based on currentStage */}
        {currentStage === 1 && <Offer id={id} userType={userType} transaction={transaction} apartment={apartment} sellerInfo={sellerInfo} />}
        {currentStage === 2 && <Funds id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 3 && <AddConveyancer userType={userType} transaction={transaction} apartment={apartment} userInformation={userInformation} />}
        {currentStage === 4 && <ResearchSurvey userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 5 && <Contract userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 6 && <NutlipCommission userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 7 && <Deposit userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 8 && <DOC userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 9 && <FullPayment userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 10 && <TransferTitle userType={userType} transaction={transaction} apartment={apartment} />}
        {currentStage === 11 && <Success userType={userType} transaction={transaction} apartment={apartment} />}

        {currentStage !== 11 && (
          <div id={styles.page_nav}>
            <button>
              Completed: <span>Offer Accepted</span>
            </button>
            <button onClick={handleNextClick}>
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
      <Image src="/buyerprocess/success.png" alt="success" width={300} height={200} />
      <div className={styles.successText}>
        <h2>Congratulations</h2>
        <p>Transaction complete</p>
      </div>
    </div>
  );
};

export default Process;
