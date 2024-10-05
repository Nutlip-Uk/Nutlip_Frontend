import React, { createContext, useState, useEffect, useContext } from 'react';
import useSWR, { mutate } from 'swr';
import { LoginContext } from './Login.context';

export const TransactionContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const TransactionProvider = ({ children, id }) => {
    const { userInformation } = useContext(LoginContext);
    const [userType, setUserType] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(30000); // Default to 60 seconds

    const { data: transactionData, error: transactionError } = useSWR(
        id ? `https://nutlip-server.uc.r.appspot.com/api/transaction/gettransaction/${id}` : null,
        fetcher,
        { refreshInterval }
    );
    console.log('Transaction Data:', transactionData);
    console.log('Transaction Error:', transactionError);

    const { data: transactionContentData, error: transactionContentError } = useSWR(
        id ? `https://nutlip-server.uc.r.appspot.com/api/transaction/gettransactioncontent/${id}` : null,
        fetcher,
        { refreshInterval }
    );
    console.log('Transaction Content Data:', transactionContentData);
    console.log('Transaction Content Error:', transactionContentError);

    const { data: apartmentData, error: apartmentError } = useSWR(
        transactionData ? `https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${transactionData.transaction.ApartmentId}` : null,
        fetcher,
        { refreshInterval }
    );
    console.log('Apartment Data:', apartmentData);
    console.log('Apartment Error:', apartmentError);

    const { data: sellerData, error: sellerError } = useSWR(
        userInformation ? `https://nutlip-server.uc.r.appspot.com/api/users/${userInformation.user.id}` : null,
        fetcher,
        { refreshInterval }
    );
    console.log('Seller Data:', sellerData);
    console.log('Seller Error:', sellerError);

    const { data: agentData, error: agentError } = useSWR(
        apartmentData ? `https://nutlip-server.uc.r.appspot.com/api/users/${apartmentData.data.userId}` : null,
        fetcher,
        { refreshInterval }
    );
    console.log('Agent Data:', agentData);
    console.log('Agent Error:', agentError);

    const transaction = transactionData?.transaction;
    const transactionContent = transactionContentData?.transactioncontent[0];
    const apartment = apartmentData?.data;
    const sellerInfo = sellerData?.data;
    const agent = agentData?.data;

    const adjustedStage = transaction ? Math.max(0, transaction.transactionCurrentStage - 1) : 0;

    const isLoading = !transactionData || !transactionContentData || !apartmentData || !sellerData || !agentData;
    const isError = transactionError || transactionContentError || apartmentError || sellerError || agentError;

    useEffect(() => {
        if (transactionContent && userInformation) {
            if (transactionContent.convenyancer_buyer === userInformation.user.id) {
                setUserType("conveyancer_buyer");
            } else if (transactionContent.convenyancer_seller === userInformation.user.id) {
                setUserType("conveyancer_seller");
            } else {
                setUserType(sellerInfo?.userType?.type);
            }
        }
    }, [transactionContent, userInformation, sellerInfo]);

    const revalidateData = () => {
        return Promise.all([
            mutate(`https://nutlip-server.uc.r.appspot.com/api/transaction/gettransaction/${id}`),
            mutate(`https://nutlip-server.uc.r.appspot.com/api/transaction/gettransactioncontent/${id}`),
            mutate(`https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${transactionData?.transaction?.ApartmentId}`),
            mutate(`https://nutlip-server.uc.r.appspot.com/api/users/${userInformation?.user?.id}`),
            mutate(`https://nutlip-server.uc.r.appspot.com/api/users/${apartmentData?.data?.userId}`)
        ]).then(() => {
            setRefreshInterval(300000); // Set refresh interval to 5 minutes (300000 ms)
        });
    };

    return (
        <TransactionContext.Provider value={{ transaction, apartment, transactionStage: adjustedStage, sellerInfo, agent, userType, transactionContent, isLoading, isError, revalidateData }}>
            {children}
        </TransactionContext.Provider>
    );
};