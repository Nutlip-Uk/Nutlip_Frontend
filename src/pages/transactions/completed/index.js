import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styles from "../../../styles/Transactions/complete.module.css";
import { LoginContext } from "../../../context/Login.context";
import { UserTypeContext } from "../../../context/UserType.context";

const CompletedTransactions = () => {
  const { userInformation } = useContext(LoginContext);
  const { userType } = useContext(UserTypeContext);

  const userId = userInformation?.user?.id;
  const [completedData, setCompletedData] = React.useState([]);

  useEffect(() => {
    if (userType !== "Conveyancer") {
      const fetchCompletedTransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-server.uc.r.appspot.com/api/transaction/getCompletedTransactionForAUser/${userId}`
          );
          const data = await res.json();
          console.log("Completed Transaction", data.data);
          setCompletedData(data.data);
        }
      };
      fetchCompletedTransactions();
    } else {
      const fetchConveyancersCompletedTransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-server.uc.r.appspot.com/api/conveyancer/getcompletedtransaction/${userId}`
          );
          const data = await res.json();
          console.log("Conveyancer Completed Transaction", data.data);
          setCompletedData(data.data);
        }
      };
      fetchConveyancersCompletedTransactions();
    }
  }, [userId]);

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href={"/transactions"} className={styles.Header}>
          <h2>Completed Transactions</h2>
        </Link>

        {completedData.length == 0 && (
          <div>
            <p className="text-neutral-600 ">No Completed Transaction found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedTransactions;
