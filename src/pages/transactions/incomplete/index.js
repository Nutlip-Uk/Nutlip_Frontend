import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/Transactions/complete.module.css";
import { LoginContext } from "../../../context/Login.context";
import { UserTypeContext } from "../../../context/UserType.context";
import { useImageContext } from "../../../context/ImageContext.context";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import CopyButton from "../../../components/CopyButton";
const InCompletedTransactions = () => {
  const { userType } = useContext(UserTypeContext);
  const { userInformation } = useContext(LoginContext);

  const userId = userInformation?.user?.id;
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
            ? `https://nutlip-server.uc.r.appspot.com/api/transaction/getUnCompletedTransactionForAUser/${userId}`
            : `https://nutlip-server.uc.r.appspot.com/api/conveyancer/getuncompletedtransaction/${userId}`;

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
  }, [userId, userType, setLoading]);

  if (error) {
    toast.error(error);
  }

  function formatUserId(userId) {
    const firstPart = userId?.slice(0, 4);
    const lastPart = userId?.slice(-4);
    return `${firstPart}....${lastPart}`;
  }

  return (
    <>
      {loading && <Loading />}

      <div className={styles.Section}>
        <div className={styles.container}>
          <Link href={"/transactions"} className={styles.Header}>
            <h2>Incompleted Transactions</h2>
          </Link>

          {completedData.length === 0 ? (
            <div>
              <p className="text-neutral-600">
                No Incompleted Transaction found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {completedData.map((data) => (
                <Link
                  href={`/transactions/current/${data?.transaction?._id}`}
                  key={data?._id}
                  className={`${styles.Box} bg-white rounded-lg shadow-md`}
                >
                  <p className="px-2 py-1 text-white bg-red-400 rounded-lg">
                    <span className="font-medium">Transaction Id:</span>{" "}
                    {formatUserId(data?.transaction?._id)}{" "}
                    <CopyButton textToCopy={data?.transaction?._id} />
                  </p>
                  <p className="font-medium">
                    <span className="text-lg font-medium">
                      Transaction Stage:
                    </span>{" "}
                    {data?.transaction.transactionCurrentStage}
                  </p>
                  {data.apartment ? (
                    <>
                      <p className="text-lg font-medium line-clamp-1">
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
  );
};
export default InCompletedTransactions;
