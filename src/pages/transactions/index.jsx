import styles from "../../styles/Transactions/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserTypeContext } from "../../context/UserType.context";

const Transactions = () => {
  const router = useRouter();

  const userType = useContext(UserTypeContext)

  console.log('USER TYPE', userType.userType)

  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <h2 className={styles.Header}>Transactions</h2>
        <div className={styles.ListContainer}>
          <div
            className={styles.ListBox}
            style={userType.userType !== "Conveyancer" ? {} : { display: "none" }} onClick={() => router.push("/transactions/current")}
          >
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={30}
              height={30}
              alt=""
            />
            <h3>In-progress</h3>
            <p>Transactions currently ongoing</p>
          </div>

          <div
            className={styles.ListBox}
            onClick={() => router.push("/transactions/completed")}
          >
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={30}
              height={30}
              alt=""
            />
            <h3>Completed transactions</h3>
            <p>Transactions completed in full</p>
          </div>

          <div
            className={styles.ListBox}
            onClick={() => router.push("/transactions/cancelled")}
          >
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={30}
              height={30}
              alt=""
            />
            <h3>Cancelled transactions</h3>
            <p>Transactions halted</p>
          </div>

          <div
            className={styles.ListBox}
            style={userType.userType !== "Conveyancer" ? {} : { display: "none" }}
            onClick={() => router.push("/transactions/offerssent")}
          >
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={30}
              height={30}
              alt=""
            />
            <h3>Offers Sent</h3>
            <p>All Offers sent to a property</p>
          </div>
          {userType.userType == "Conveyancer" && <div
            className={styles.ListBox}
            onClick={() => router.push("/transactions/incomplete")}
          >
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={30}
              height={30}
              alt=""
            />
            <h3>Incomplete Transactions</h3>
            <p>All Incomplete Transactions</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Transactions;