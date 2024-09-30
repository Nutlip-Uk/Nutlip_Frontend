import Button from "../styled components/Button"
import styles from "../../styles/BuyerProcess/commission.module.css"
<<<<<<< HEAD
import { useImageContext } from "../../context/ImageContext.context";


export const NutlipCommission = ({ id, transactionContent, userType, handleBackClick, handleNextClick, currentStage, transactionNames }) => {
    const { setLoading } = useImageContext();
    const HandleConfirm = async () => {
        setLoading(true);
=======


export const NutlipCommission = ({ id, transactionContent, userType, handleBackClick, handleNextClick, currentStage, transactionNames }) => {

    const HandleConfirm = async () => {
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
        try {
            const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_nutlippayment_07`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Successfully Confirmed message
<<<<<<< HEAD
                setLoading(false);
            }
        } catch (error) {
            console.error('Error Confirming Payment:', error);
            setLoading(false);
=======
            }
        } catch (error) {
            console.error('Error Confirming Payment:', error);
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
        }
    }

    return (
        <>
            <div className={styles.offer}>
                <div className={styles.text}>
                    <h2 className="font-semibold text-xl" >Nutlip Commission Payment</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Document should be maximum of 2MB in these formats; png, jpg, pdf or doc.</p>
                </div>

                <div className={styles.paymentContainer}>

                    <div className={styles.debitCard}>
                        {!transactionContent?.payment_of_nutlip_commision && (
                            <>
                                {userType == "conveyancer_buyer" ? <img onClick={HandleConfirm} src="/buyerprocess/debitcards.png" alt="debit cards" /> : <p style={{ color: "red" }}>{"Waiting for Seller Coveyancer to make Commission payment..."}</p>}
                                <button><em>Payment via debit card</em></button>
                            </>
                        )}
                        {transactionContent?.payment_of_nutlip_commision == true && <button style={{ color: "green" }} className={styles.confirm} ><em> Payment Confirmed</em></button>}
                    </div>

                    <button className={styles.blockChain}><em>Payment via Blockchain</em></button>
                </div>
            </div>

            <div className="flex gap-4 justify-between w-full" id="page_nav">
                <button
                    onClick={handleBackClick}
                    disabled={currentStage === 0}
                    className={`flex items-center gap-2 text-black border-b border-black text-base font-medium ${currentStage === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                >
                    Back
                </button>

                <button
                    onClick={handleNextClick}
                    disabled={!transactionContent?.payment_of_nutlip_commision}
                    className={`flex items-center gap-2 text-red-600 border-b border-red-600 text-base font-medium ${currentStage >= transactionNames?.length - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }  ${(transactionContent?.payment_of_nutlip_commision) ? "" : "text-gray-600 border-gray-600 opacity-25 "}`}
                >
                    Next : <span>{"10% Deposit"}</span>
                </button>
            </div>

        </>
    )
}