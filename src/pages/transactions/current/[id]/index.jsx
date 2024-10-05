import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TransactionContext, TransactionProvider } from '../../../../context/Transaction.context';
import { Chat } from '../../../../components/styled components/Chat';
import Progress_bar from '../../../../components/ProgressBar';
import Button from '../../../../components/styled components/Button';
import styles from '../../../../styles/Transactions/OfferProcess.module.css';
import Image from 'next/image';
import Loading from '../../../../components/Loading';
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
} from '../../../../components/Buyer Process';
import { useImageContext } from '../../../../context/ImageContext.context';
import { LoginContext } from '../../../../context/Login.context';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import CopyButton from '../../../../components/CopyButton';

const Process = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const router = useRouter();
  const { id, stage } = router.query;
  const { transaction, apartment, transactionStage, sellerInfo, agent, userType, transactionContent, isLoading, isError, revalidateData } = useContext(TransactionContext);
  const { loading, setLoading } = useImageContext();
  const { userInformation } = useContext(LoginContext)

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

  const handleZoomClick = () => {
    router.push("/zoom");
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;


  function formatUserId(userId) {
    const firstPart = userId?.slice(0, 4);
    const lastPart = userId?.slice(-4);
    return `${firstPart}....${lastPart}`;
  }


  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Chat position="fixed" top="85%" right={20} />

        <div id={styles.top_bar}>
          <div className={styles.rightSide}>
            <div className={styles.googlemeet}>
              <Image
                src="/brand-zoom-svgrepo-com.svg"
                width={30}
                height={30}
                alt=""
              />
              <p onClick={handleZoomClick} style={{ cursor: "pointer" }}>
                Zoom
              </p>
            </div>

            <li>Online (1)</li>

            <div className={styles.TransactionId}>
              <p style={{ textTransform: "uppercase" }}>
                <span style={{ textTransform: "Capitalize" }}>
                  Transaction ID:
                </span>
                {formatUserId(id)} <CopyButton textToCopy={id} />
              </p>
            </div>
          </div>

          {currentStage >= 5 ? null : (
            <button className={styles.CancelTransaction}>
              Cancel <span>Transaction</span>
            </button>
          )}
        </div>

        <Progress_bar bgcolor="#001F6D" progress={progress} height={30} />

        <motion.button
          className='fixed bottom-36 right-20 bg-blue-800 text-3xl text-white rounded-full p-3'
          onClick={() => {
            setIsSpinning(true);
            revalidateData().finally(() => setIsSpinning(false)); // Ensure spinning stops after revalidation
          }}
          animate={{ rotate: isSpinning ? 360 : 0 }}
          transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
        >
          <FiRefreshCw />
        </motion.button>

        {currentStage === 0 && (
          <Offer
            id={id}
            userType={userType}
            transaction={transaction}
            transactionContent={transactionContent}
            apartment={apartment}
            sellerInfo={sellerInfo}
            isLoading={isLoading}
            agent={agent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 1 && (
          <Funds
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            isLoading={isLoading}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 2 && (
          <AddConveyancer
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            userInformation={userInformation}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 3 && (
          <ResearchSurvey
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            id={id}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 4 && (
          <Contract
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 5 && (
          <NutlipCommission
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 6 && (
          <Deposit
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 7 && (
          <DOC
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 8 && (
          <FullPayment
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 9 && (
          <TransferTitle
            id={id}
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
            handleBackClick={handleBackClick}
            handleNextClick={handleNextClick}
            currentStage={currentStage}
          />
        )}
        {currentStage === 10 && (
          <Success
            userType={userType}
            transaction={transaction}
            apartment={apartment}
            transactionContent={transactionContent}
          />
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div
      className={"flex flex-col justify-center items-center gap-y-3 w-full "}
    >
      <div
        className={"w-full flex flex-col gap-y-3 justify-center items-center "}
      >
        <Image
          src="/buyerprocess/success.png"
          alt="success"
          width={300}
          height={200}
        />
        <div className={"flex flex-col justify-center items-center gap-y-1 "}>
          <h2 className={"text-md font-semibold"}>Congratulations</h2>
          <p className={"text-lg font-semibold"}>Transaction complete</p>
        </div>
      </div>
    </div>
  );
};

const ProcessWrapper = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <TransactionProvider id={id}>
      <Process />
    </TransactionProvider>
  );
};

export default ProcessWrapper;
