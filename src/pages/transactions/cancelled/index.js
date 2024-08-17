import Link from "next/link";
import React from "react";
import styles from "../../../styles/Transactions/cancelled.module.css";
const CancelledTransactions = () => {
  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href={"/transactions"} className={styles.Header}>
          <h2>Cancelled Transactions</h2>
        </Link>
      </div>
    </div>
  );
};

export default CancelledTransactions;
