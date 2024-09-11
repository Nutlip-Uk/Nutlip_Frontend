import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../context/Login.context";
import styles from "../../../styles/Transactions/complete.module.css";
import { UserTypeContext } from "../../../context/UserType.context";

const InCompletedTransactions = () => {
  const { userInformation } = useContext(LoginContext);
  const { userType } = useContext(UserTypeContext);

  const [IncompleteData, setIncompleteData] = useState([]);

  const userId = userInformation?.user?.id;

  useEffect(() => {
    if (userType !== "Conveyancer") {
      const fetchIncompletedTransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-backend.onrender.com/api/transaction/getUnCompletedTransactionForAUser/${userId}`
          );
          const data = await res.json();
          console.log("Incompleted Transaction", data.data);
          setIncompleteData(data?.data);
        }
      };
      fetchIncompletedTransactions();
    } else {
      const fetchConveyancersIncompletedTransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-backend.onrender.com/api/conveyancer/getuncompletedtransaction/${userId}`
          );
          const data = await res.json();
          console.log("Conveyancer Incomplete Transaction", data?.data);
          setIncompleteData(data?.data);
        }
      };
      fetchConveyancersIncompletedTransactions();
    }
  }, [userId, userType]);

  return (
    <div className={`${styles.Section} `}>
      <div className={` ${styles.container}`}>
        <Link href={"/transactions"} className={` ${styles.Header}`}>
          <h2>Incomplete Transactions</h2>
        </Link>

        {IncompleteData.length == 0 && (
          <div>
            <p className="text-neutral-600">No Incomplete Transaction found</p>
          </div>
        )}

        <div>
          {IncompleteData.map((data) => {
            return (
              <Link
                href={`/transactions/current/${data?.transaction?._id}`}
                key={data?._id}
                className={`${styles.Box} bg-white w-full rounded-lg shadow-md`}
              >
                <p>Transaction Id: {data?.transaction?._id.slice(0, 7)}</p>
                <p>
                  Transaction Stage :
                  {data?.transaction?.transactionCurrentStage}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InCompletedTransactions;
