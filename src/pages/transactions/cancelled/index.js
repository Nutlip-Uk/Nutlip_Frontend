import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styles from "../../../styles/Transactions/cancelled.module.css";
import { LoginContext } from "../../../context/Login.context";
import { UserTypeContext } from "../../../context/UserType.context";

const CancelledTransactions = () => {
  const { userInformation } = useContext(LoginContext);
  const { userType } = useContext(UserTypeContext);

  const userId = userInformation?.user?.id;

  const [cancelledData, setCancelledData] = React.useState([]);

  useEffect(() => {
    if (userType !== "Conveyancer") {
      const fetchCancelledtransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-backend-wdsi.onrender.com/api/transaction/getCanceledTransactionForAUser/${userId}`
          );
          const data = await res.json();
          console.log("Cancelled Transaction", data);
          setCancelledData(data.data);
        }
      };
      fetchCancelledtransactions();
    } else {
      const fetchConveyancersCancelledtransactions = async () => {
        if (userId) {
          const res = await fetch(
            `https://nutlip-backend-wdsi.onrender.com/api/conveyancer/getCanceledTransaction/${userId}`
          );
          const data = await res.json();
          console.log("Conveyancer Cancelled Transaction", data);
          setCancelledData(data.data);
        }
      };
      fetchConveyancersCancelledtransactions();
    }
  }, [userId]);

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href={"/transactions"} className={styles.Header}>
          <h2>Cancelled Transactions</h2>
        </Link>
        {cancelledData.length == 0 && (
          <div>
            <p className="text-neutral-600">No Cancelled Transaction found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelledTransactions;
