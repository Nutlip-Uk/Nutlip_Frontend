import Link from "next/link";
<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/Transactions/complete.module.css";
import { LoginContext } from "../../../context/Login.context";
import { UserTypeContext } from "../../../context/UserType.context";
import { useImageContext } from "../../../context/ImageContext.context";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
=======
import React, { useContext, useEffect } from "react";
import styles from "../../../styles/Transactions/complete.module.css";
import { LoginContext } from "../../../context/Login.context";
import { UserTypeContext } from "../../../context/UserType.context";
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731

const CompletedTransactions = () => {
  const { userInformation } = useContext(LoginContext);
  const { userType } = useContext(UserTypeContext);

  const userId = userInformation?.user?.id;
<<<<<<< HEAD
  const [completedData, setCompletedData] = useState([]);
  const { loading, setLoading } = useImageContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTransactions = async () => {
      if (!userId) return;

      setLoading(true); // Set loading to true while fetching
      setError(null); // Reset error before fetching

      try {
        // Fetch completed transactions for user or conveyancer
        const transactionUrl =
          userType !== "Conveyancer"
            ? `https://nutlip-server.uc.r.appspot.com/api/transaction/getCompletedTransactionForAUser/${userId}`
            : `https://nutlip-server.uc.r.appspot.com/api/conveyancer/getcompletedtransaction/${userId}`;

        const res = await fetch(transactionUrl);
        if (!res.ok) throw new Error("Failed to fetch transactions");

        const transactionData = await res.json();
        const transactions = transactionData.data || [];

        console.log("Fetched Transactions:", transactions);

        // Fetch apartment data for each transaction
        const updatedTransactions = await Promise.all(
          transactions.map(async (transaction) => {
            try {
              const apartmentRes = await fetch(
                `https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${transaction.transaction.ApartmentId}`
              );
              if (apartmentRes.ok) {
                const apartmentData = await apartmentRes.json();
                return { ...transaction, apartment: apartmentData.data };
              }
              console.warn(
                `Failed to fetch apartment for transaction ${transaction._id}`
              );
              return transaction; // Return transaction without apartment data if fetch fails
            } catch (err) {
              console.error("Error fetching apartment data:", err);
              return transaction; // Return transaction without apartment data if an error occurs
            }
          })
        );

        setCompletedData(updatedTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.message); // Set error if fetching fails
      } finally {
        setLoading(false); // Always set loading to false when finished
      }
    };

    fetchCompletedTransactions();
  }, [userId, userType]);

  if (error) {
    toast.error(error);
  }

  return (
    <>
      {loading && <Loading />}

      <div className={styles.Section}>
        <div className={styles.container}>
          <Link href={"/transactions"} className={styles.Header}>
            <h2>Completed Transactions</h2>
          </Link>

          {completedData.length === 0 ? (
            <div>
              <p className="text-neutral-600">No Completed Transaction found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {completedData.map((data) => (
                <Link
                  href={`/transactions/current/${data?._id}`}
                  key={data?._id}
                  className={`${styles.Box} bg-white rounded-lg shadow-md`}
                >
                  <p className="bg-red-400 py-1 px-2 rounded-lg text-white">
                    <span className="font-medium">Transaction Id:</span>{" "}
                    {data?._id.slice(0, 7)}
                  </p>
                  <p className="font-medium">
                    <span className="text-lg font-medium">
                      Transaction Stage:
                    </span>{" "}
                    {data?.transaction.transactionCurrentStage}
                  </p>
                  {data.apartment ? (
                    <>
                      <p className="line-clamp-1 text-lg font-medium">
                        {data.apartment.Title}
                      </p>
                    </>
                  ) : (
                    <p>No apartment data available</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
=======
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

        <div>
          {completedData.map((data) => {
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
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  );
};

export default CompletedTransactions;
