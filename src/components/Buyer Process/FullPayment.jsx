/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import styles from "../../styles/BuyerProcess/FullPayment.module.css";
import { useContext, useState } from 'react';
import { ImageContext } from "../../context/ImageContext.context";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { LoginContext } from '../../context/Login.context';

export const FullPayment = ({ userType, transaction, transactionContent, id }) => {
    const { userInformation } = useContext(LoginContext);
    const [uploading, setUploading] = useState(false);
    const { url, setUrl } = useContext(ImageContext);
    const [fileUrl, setFileUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [form, setForm] = useState({
        transactionId: id,
        userId: userInformation.user.id,
        accountName: "",
        accountNo: "",
        bankName: "",
        IBAN: "",
        sortcode: ""
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isAccountInfoSent, setIsAccountInfoSent] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            () => {
                setUploading(true);
            },
            (error) => {
                console.error(error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUrl(downloadURL);
                    setUrl(downloadURL);
                    console.log('File available at:', downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    const HandleBankDetails = async () => {
        e.preventDefault();
        console.log("BANK DETAILS", form);
        try {
            const response = await fetch("https://nutlip-backend.onrender.comapi/transaction/transaction_proofoffunds10_08_upload_bankdetails", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    form
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("RESPONSE FOR BANK DETAILS SENT", data);
            }

        } catch (error) {
            console.error("Error submitting bank details:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("File URL:", fileUrl);
            console.log("url", url);

            const response = await fetch("https://nutlip-backend.onrender.comapi/transaction/transaction_proofoffunds90_012", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    content: fileUrl
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Data posted successfully", data.message);
            }
        } catch (error) {
            console.error(error && error.message);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch("https://nutlip-backend.onrender.comapi/transaction/transaction_confirmproofoffunds90_013", {
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
                console.log(data);
                setConfirmed(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.offer}>
            <section>
                <h2 className='text-xl font-semibold'>{"Full Payment"}</h2>

                {userType === "conveyancer_buyer" && (
                    <p>
                        Please deposit in full money remaining for the purchase of the Real Estate property into the designated Bank Account of the Seller and then upload an evidence of payment to the Seller. The Seller's Bank Account details are stated below:
                    </p>
                )}

                {userType === "conveyancer_seller" && (
                    <p>
                        Please provide the details of your designated bank account below, for which the buyer can deposit the remaining amount of the total amount accepted for the purchase of the Real Estate property.
                    </p>
                )}

                <br />
                {userType === "conveyancer_seller" && (
                    <strong>Amount : € {transaction.offer.PriceOffer * 0.9}</strong>
                )}
            </section>

            {(userType === "conveyancer_buyer" || userType === "property_seeker" || userType === "Real_estate_agent") && transactionContent.bankdetails.length > 0 && (
                <section className={styles.list}>
                    <p>SELLER BANK DETAILS</p>
                    <ul>
                        <li>Bank name: {transactionContent.bankdetails[0]?.bankName}</li>
                        <li>Sort code: {transactionContent.bankdetails[0]?.sortcode}</li>
                        <li>Account number: {transactionContent.bankdetails[0]?.accountNo}</li>
                        <li>Account name: {transactionContent.bankdetails[0]?.accountName}</li>
                        <li>IBAN: {transactionContent.bankdetails[0]?.IBAN}</li>
                        <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
                    </ul>
                </section>
            )}

            {userType === "conveyancer_buyer" && (
                <div className={styles.fileContainer}>
                    {!transactionContent.proof_of_funds_90 && <section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                'Upload Document'
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                    </section>}

                    {transactionContent.proof_of_funds_90 && <section id={styles.file_upload}>
                        <label>

                            <img src={transactionContent.proof_of_funds_90} width={250} height={200} alt="Uploaded document" />

                        </label>
                    </section>}

                    {transactionContent.proof_of_funds_90 && <button style={{ background: "green" }} className={styles.fileuploadButton}>Sent</button>}
                    {!transactionContent.proof_of_funds_90 && <button className={styles.fileuploadButton} onClick={handleSubmit}>Continue</button>}
                </div>
            )}
            {userType === "conveyancer_seller" && (
                <>
                    {transactionContent.bankdetails.length > 0 ? (
                        <section className={styles.formContainer}>
                            <p className={styles.formHeader}>{"Bank Account Details"}</p>
                            {transactionContent.bankdetails.length < 0 && <ul>
                                <li>Bank name: {form.bankName}</li>
                                <li>Sort code: {form.sortcode}</li>
                                <li>Account number: {form.accountNo}</li>
                                <li>Account name: {form.accountName}</li>
                                <li>IBAN: {form.IBAN}</li>
                                <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
                            </ul>}

                            {
                                transactionContent.bankdetails.length > 0 && transactionContent.bankdetails[0] &&
                                <ul>
                                    <li>Bank name: {transactionContent.bankdetails[0].bankName}</li>
                                    <li>Sort code: {transactionContent.bankdetails[0].sortcode}</li>
                                    <li>Account number: {transactionContent.bankdetails[0].accountNo}</li>
                                    <li>Account name: {transactionContent.bankdetails[0].accountName}</li>
                                    <li>IBAN: {transactionContent.bankdetails[0].IBAN}</li>
                                    <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
                                </ul>
                            }


                            {transactionContent.bankdetails.length > 0 ? (
                                <button style={{ background: "green", maxWidth: "30%", display: "none" }} className={styles.confirm} >Sent</button>
                            ) : (
                                <button type="button" style={{ maxWidth: "30%" }} onClick={handleSubmit} className={styles.confirm}>Send</button>
                            )}

                            <div className={styles.fileContainer}>
                                <section id={styles.file_upload}>
                                    <label>
                                        {transactionContent?.proof_of_funds_90 === "" ? (
                                            "User has not uploaded Funds document yet"
                                        ) : (
                                            <img src={transactionContent.proof_of_funds_90} alt="Uploaded document" />
                                        )}
                                    </label>
                                </section>
                                {transactionContent?.proof_of_funds_90 !== "" && (
                                    <button className={styles.fileuploadButton} style={!transactionContent?.confirm_proof_of_funds_90 ? { background: "red" } : { background: "green" }} onClick={handleConfirm}>{transactionContent?.confirm_proof_of_funds_90 !== true ? "Confirm Fund" : "confirmed funds"}</button>
                                )}
                            </div>
                        </section>
                    ) : (
                        <section className={styles.formContainer}>
                            <p className={styles.formHeader}>{" Bank Account Details"}</p>
                            <form className={styles.form} onSubmit={handleConfirm}>
                                <div className={styles.formInput}>
                                    <label>
                                        Account name
                                        <input
                                            type="text"
                                            required
                                            placeholder="Account name"
                                            value={transactionContent.bankdetails[0].accountName}
                                            onChange={handleFormChange}
                                            name="accountName"
                                        />
                                    </label>
                                </div>
                                <div className={styles.formInput}>
                                    <label>
                                        Bank name
                                        <input
                                            required
                                            type="text"
                                            placeholder="Bank name"
                                            value={form.bankName}
                                            onChange={handleFormChange}
                                            name="bankName"
                                        />
                                    </label>
                                </div>
                                <div className={styles.formInput}>
                                    <label>
                                        Sort code
                                        <input
                                            required
                                            type="text"
                                            placeholder="Sort code"
                                            value={form.sortcode}
                                            onChange={handleFormChange}
                                            name="sortcode"
                                        />
                                    </label>
                                </div>
                                <div className={styles.formInput}>
                                    <label>
                                        Account number
                                        <input
                                            required
                                            type="text"
                                            placeholder="Account number"
                                            value={form.accountNo}
                                            onChange={handleFormChange}
                                            name="accountNo"
                                        />
                                    </label>
                                </div>
                                <div className={styles.formInput}>
                                    <label>
                                        IBAN
                                        <input
                                            required
                                            type="text"
                                            placeholder="IBAN"
                                            value={form.IBAN}
                                            onChange={handleFormChange}
                                            name="IBAN"
                                        />
                                    </label>
                                </div>
                                <button type="submit" className={styles.confirm}>Confirm</button>
                            </form>
                        </section>
                    )}
                </>
            )
            }

            {
                (userType === "property_seeker" || userType === "Real_estate_agent") && (
                    <>
                        {transactionContent?.proof_of_funds_90 ?
                            (<div className={styles.fileContainer}>
                                <section id={styles.file_upload}>
                                    <label>
                                        {transactionContent?.proof_of_funds_90 === "" ? (
                                            "User has not uploaded Funds document yet"
                                        ) : (
                                            <img src={transactionContent.proof_of_funds_90} alt="Uploaded document" />
                                        )}
                                    </label>
                                </section>
                                {transactionContent?.confirm_proof_of_funds_90 && (
                                    <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Confirmed</button>
                                )}
                            </div>) : (
                                <div>
                                    <p className='text-red-500 font-semibold'>Documents havent been uploaded or confirmed yet by respective party...</p>
                                </div>
                            )}
                    </>
                )
            }



        </div>
    );
};
