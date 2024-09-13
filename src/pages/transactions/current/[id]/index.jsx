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
  const [currentStage, setCurrentStage] = useState(0); // To handle rendering from stage 1
  const router = useRouter();
  const { id } = router.query;
  const [transaction, setTransaction] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [transactionStage, setTransactionStage] = useState(1);
  const [sellerInfo, setSellerInfo] = useState([]);
  const [agent, setAgent] = useState([]);
  const [userType, setUserType] = useState(null);
  const { userInformation } = useContext(LoginContext);
  const [transactionContent, setTransactionContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      console.log("user ID:", userInformation?.user?.id);

      setIsLoading(true); // Start loading

      try {
        // Fetch transaction data
        const transactionResponse = await fetch(`https://nutlip-backend-wdsi.onrender.com/api/transaction/gettransaction/${id}`);
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData.transaction);
        setTransactionStage(transactionData.transaction.transactionCurrentStage);
        console.log("transactionData:", transactionData.transaction);

        if (transactionResponse.ok) {
          // Fetch transaction content data
          const txcontent = await fetch(`https://nutlip-backend-wdsi.onrender.com/api/transaction/gettransactioncontent/${id}`);
          const data = await txcontent.json();
          const transactionContentData = data.transactioncontent[0];
          setTransactionContent(transactionContentData);
          console.log("TRANSACTION CONTENT", transactionContentData);

          // Fetch apartment data using transactionData
          const apartmentResponse = await fetch(`https://nutlip-backend-wdsi.onrender.com/api/apartments/getapartment/${transactionData.transaction.ApartmentId}`);
          const apartmentData = await apartmentResponse.json();
          setApartment(apartmentData.data);
          console.log("apartmentData:", apartmentData.data);

          // Fetch seller data using userInformation
          const sellerResponse = await fetch(`https://nutlip-backend-wdsi.onrender.com/api/users/${userInformation?.user?.id}`);
          const sellerData = await sellerResponse.json();
          setSellerInfo(sellerData.data);
          console.log("seller data", sellerInfo);

          // Fetch agent data using apartment data
          const agentResponse = await fetch(`https://nutlip-backend-wdsi.onrender.com/api/users/${apartmentData.data.userId}`);
          const agentData = await agentResponse.json();
          setAgent(agentData.data);
          console.log("agent data", agentData.data);

          // Determine userType based on fetched data
          if (transactionContentData.convenyancer_buyer === userInformation?.user?.id) {
            setUserType("conveyancer_buyer");
          } else if (transactionContentData.convenyancer_seller === userInformation?.user?.id) {
            setUserType("conveyancer_seller");
          } else {
            setUserType(sellerData.data.userType?.type);
          }

          console.log("userData:", sellerData.data);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, userInformation?.user?.id, transactionStage, transactionContent, sellerInfo]);

  useEffect(() => {
    setProgress(Math.floor((currentStage / 10) * 100));
  }, [currentStage]);

  const handleNextClick = () => {
    if (currentStage < transactionStage) {
      setCurrentStage(currentStage + 1);
    } else {
      console.log('Cannot progress to the next stage until the current Transaction stage is completed.');
    }
  };


  console.log('WHAT USERTYPE', userType)

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        {currentStage !== 11 && <Chat position="fixed" top="85%" right={20} />}

        <div id={styles.top_bar}>
          <div className={styles.rightSide}>
            <div className={styles.googlemeet} >
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
                <span style={{ textTransform: "Capitalize" }}>Transaction ID:</span>
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
        {currentStage === 0 && <Offer id={id} userType={userType} transaction={transaction} apartment={apartment} sellerInfo={sellerInfo} isLoading={isLoading} agent={agent} />}
        {currentStage === 1 && <Funds id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} isLoading={isLoading} />}
        {currentStage === 2 && <AddConveyancer id={id} userType={userType} transaction={transaction} apartment={apartment} userInformation={userInformation} transactionContent={transactionContent} />}
        {currentStage === 3 && <ResearchSurvey userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} id={id} />}
        {currentStage === 4 && <Contract id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 5 && <NutlipCommission id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 6 && <Deposit id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 7 && <DOC id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 8 && <FullPayment id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 9 && <TransferTitle id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {currentStage === 10 && <Success userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}

        {currentStage !== 10 && (
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
    <div className={"flex flex-col justify-center items-center gap-y-3 w-full "}>
      <div className="w-full flex flex-col gap-y-3 justify-center items-center ">
        <Image src="/buyerprocess/success.png" alt="success" width={300} height={200} />
        <div className={"flex flex-col justify-center items-center gap-y-1 "}>
          <h2 className="text-md font-semibold">Congratulations</h2>
          <p className="text-lg font-semibold ">Transaction complete</p>
        </div>
      </div>
    </div>
  );
};

export default Process;
