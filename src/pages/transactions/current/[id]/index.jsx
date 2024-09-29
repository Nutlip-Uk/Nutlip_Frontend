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
import Loading from "../../../../components/Loading";
import { useImageContext } from "../../../../context/ImageContext.context";

const Process = () => {

  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const router = useRouter();
  const { id, stage } = router.query;
  const pathname = router.pathname;
  const [transaction, setTransaction] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [transactionStage, setTransactionStage] = useState(0);
  const [sellerInfo, setSellerInfo] = useState([]);
  const [agent, setAgent] = useState([]);
  const [userType, setUserType] = useState(null);
  const { userInformation } = useContext(LoginContext);
  const [transactionContent, setTransactionContent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useImageContext();


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      console.log("user ID:", userInformation?.user?.id);

      setIsLoading(true);

      try {
        // Fetch transaction data
        const transactionResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/gettransaction/${id}`);
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData.transaction);

        const adjustedStage = Math.max(0, transactionData.transaction.transactionCurrentStage - 1);
        setTransactionStage(adjustedStage);

        // Set the current stage, prioritizing localStorage if available
        const savedStage = localStorage.getItem(`currentStage-${id}`);

        console.log("transactionData:", transactionData.transaction);

        if (transactionResponse.ok) {
          // Fetch transaction content data
          const txcontent = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/gettransactioncontent/${id}`);
          const data = await txcontent.json();
          const transactionContentData = data.transactioncontent[0];
          setTransactionContent(transactionContentData);
          console.log("TRANSACTION CONTENT", transactionContentData);

          // Fetch apartment data using transactionData
          const apartmentResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${transactionData.transaction.ApartmentId}`);
          const apartmentData = await apartmentResponse.json();
          setApartment(apartmentData.data);
          console.log("apartmentData:", apartmentData.data);

          // Fetch seller data using userInformation
          const sellerResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/users/${userInformation?.user?.id}`);
          const sellerData = await sellerResponse.json();
          setSellerInfo(sellerData.data);
          console.log("seller data", sellerInfo);

          // Fetch agent data using apartment data
          const agentResponse = await fetch(`https://nutlip-server.uc.r.appspot.com/api/users/${apartmentData.data.userId}`);
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
  }, [id, userInformation?.user?.id, transactionContent,]);

  useEffect(() => {
    if (stage) {
      const stageNumber = parseInt(stage, 10); // Convert the stage query param to a number
      if (!isNaN(stageNumber) && stageNumber >= 0 && stageNumber <= 10) { // Ensure it's a valid stage number
        setCurrentStage(stageNumber);
      }
    }
  }, [stage]);

  useEffect(() => {
    setProgress(Math.floor((currentStage / 10) * 100));
  }, [currentStage]);


  const handleNextClick = () => {
    if (currentStage < 10) { // Assuming there are 11 stages (0-10)
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);

      // Push the new stage (as a number) to the URL
      router.push({
        pathname: router.pathname,
        query: { ...router.query, stage: nextStage } // Update the stage query with the number
      });

      // Optionally, save the current stage to localStorage
      localStorage.setItem(`currentStage-${id}`, nextStage);
    }
  };

  const handleBackClick = () => {
    if (currentStage > 0) {
      const prevStage = currentStage - 1;
      setCurrentStage(prevStage);

      // Push the previous stage (as a number) to the URL
      router.push({
        pathname: router.pathname,
        query: { ...router.query, stage: prevStage }
      });

      // Optionally, save the current stage to localStorage
      localStorage.setItem(`currentStage-${id}`, prevStage);
    }
  };



  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Chat position="fixed" top="85%" right={20} />

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

          {currentStage >= 5 ? null : <button className={styles.CancelTransaction}>
            Cancel <span>Transaction</span>
          </button>}
        </div>

        <Progress_bar bgcolor="#001F6D" progress={progress} height={30} />

        {currentStage === 0 && <Offer id={id} userType={userType} transaction={transaction} transactionContent={transactionContent} apartment={apartment} sellerInfo={sellerInfo} isLoading={isLoading} agent={agent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 1 && <Funds id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} isLoading={isLoading} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 2 && <AddConveyancer id={id} userType={userType} transaction={transaction} apartment={apartment} userInformation={userInformation} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 3 && <ResearchSurvey userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} id={id} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 4 && <Contract id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 5 && <NutlipCommission id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 6 && <Deposit id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 7 && <DOC id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 8 && <FullPayment id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 9 && <TransferTitle id={id} userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} handleBackClick={handleBackClick} handleNextClick={handleNextClick} currentStage={currentStage} />}
        {currentStage === 10 && <Success userType={userType} transaction={transaction} apartment={apartment} transactionContent={transactionContent} />}
        {loading && <Loading />}
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div className={"flex flex-col justify-center items-center gap-y-3 w-full "}>
      <div className={"w-full flex flex-col gap-y-3 justify-center items-center "}>
        <Image src="/buyerprocess/success.png" alt="success" width={300} height={200} />
        <div className={"flex flex-col justify-center items-center gap-y-1 "}>
          <h2 className={"text-md font-semibold"}>Congratulations</h2>
          <p className={"text-lg font-semibold"}>Transaction complete</p>
        </div>
      </div>
    </div>
  );
};


export default Process;