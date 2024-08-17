import Link from "next/link";
import React from "react";
import styles from "../../../styles/Transactions/complete.module.css";

const CompletedTransactions = () => {
  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <Link href={"/transactions"} className={styles.Header}>
          <h2>Completed Transactions</h2>
        </Link>
      </div>
    </div>
  );
};

export default CompletedTransactions;
