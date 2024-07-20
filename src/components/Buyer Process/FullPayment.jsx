/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import styles from "../../styles/BuyerProcess/FullPayment.module.css";
import { useContext, useState } from 'react';
import { ImageContext } from "../../context/ImageContext.context";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';

export const FullPayment = ({ userType, transaction, transactionContent, id }) => {
    const [uploading, setUploading] = useState(false);
    const { url, setUrl } = useContext(ImageContext);
    const [fileUrl, setFileUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [form, setForm] = useState({
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        IBAN: "",
        SortCode: ""
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/transaction/12_proofoffunds90", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    offerId: transaction.offerId,
                    content: url
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Data posted successfully",data);
            } 
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch("/api/transaction/13_confirmproofoffundsupload90", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    offerId: transaction.offerId
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setConfirmed(true);
            } else {
                throw new Error("Failed to confirm proof of funds");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.offer}>
            <section>
                <h2>{"Full Payment"}</h2>

                {userType === "property_seeker" && (
                    <p>
                        Please deposit in full, monies remaining for the purchase of the Real Estate property into the designated Bank Account of the Seller and then upload an evidence of payment to the Seller. The Seller's Bank Account details are stated below:
                    </p>
                )}

                {userType === "Real_estate_agent" && (
                    <p>
                        Please provide the details of your designated bank account below, for which the buyer can deposit the remaining amount of the total amount accepted for the purchase of the Real Estate property.
                    </p>
                )}

                <br />
                {userType === "Real_estate_agent" && (
                    <strong>Amount : € {transaction.offer.PriceOffer * 0.9}</strong>
                )}
            </section>

            {userType === "property_seeker" && (
                <section className={styles.list}>
                    <ul>
                        <li>Seller’s Bank Account Details</li>
                        <li>Bank name: Bank of Scotland</li>
                        <li>Sort code: 22-12-46</li>
                        <li>Account number: 01234567</li>
                        <li>Account name: Johnson Alabija</li>
                        <li>IBAN: 26784326789012</li>
                        <li>Amount : € {transaction.offer.PriceOffer * 0.9}</li>
                    </ul>
                </section>
            )}

            {userType === "property_seeker" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                'Upload Document'
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                    </section>
                    {fileUrl && <button className={styles.fileuploadButton} onClick={handleSubmit}>Continue</button>}
                </div>
            )}

            {userType === "Real_estate_agent" && (
                <>
                    {isFormSubmitted ? (
                        <section className={styles.formContainer}>
                            <p className={styles.formHeader}>{"Seller’s Bank Account Details"}</p>
                            <ul>
                                <li>Bank name: {form.BankName}</li>
                                <li>Sort code: {form.SortCode}</li>
                                <li>Account number: {form.AccountNumber}</li>
                                <li>Account name: {form.AccountName}</li>
                                <li>IBAN: {form.IBAN}</li>
                                <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
                            </ul>
                            {isAccountInfoSent ? (
                                <button style={{ background: "green" }} className={styles.confirm} disabled>Sent</button>
                            ) : (
                                <button type="button" onClick={() => setIsAccountInfoSent(true)} className={styles.confirm}>Send</button>
                            )}

                            <div className={styles.fileContainer}>
                                <section id={styles.file_upload}>
                                    <label>
                                        {transactionContent?.proof_of_funds_90 === "" ? (
                                            "User has not uploaded Funds document yet"
                                        ) : (
                                            <img src={transactionContent.proof_of_funds_90} width={250} height={200} alt="Uploaded document" />
                                        )}
                                    </label>
                                </section>
                                {transactionContent?.proof_of_funds_90 !== "" && (
                                    <button className={styles.fileuploadButton} style={confirmed ? { background: "green" } : {background: "red"}} onClick={handleConfirm}>{ transaction?.proof_of_funds_90 !=="" ? "Confirmed Funds" : "confirm funds"}</button>
                                )}
                            </div>
                        </section>
                    ) : (
                        <section className={styles.formContainer}>
                            <p className={styles.formHeader}>{"Seller’s Bank Account Details"}</p>
                            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }}>
                                <div className={styles.formInput}>
                                    <label>
                                        Account name
                                        <input
                                            type="text"
                                            required
                                            placeholder="Account name"
                                            value={form.AccountName}
                                            onChange={handleFormChange}
                                            name="AccountName"
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
                                            value={form.BankName}
                                            onChange={handleFormChange}
                                            name="BankName"
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
                                            value={form.SortCode}
                                            onChange={handleFormChange}
                                            name="SortCode"
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
                                            value={form.AccountNumber}
                                            onChange={handleFormChange}
                                            name="AccountNumber"
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
            )}
        </div>
    );
};
