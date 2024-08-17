import Image from 'next/image'
import styles from "../../styles/BuyerProcess/TitleTransfer.module.css"
import { useContext, useEffect, useState } from 'react';
import { ImageContext } from "../../context/ImageContext.context";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';

export const TransferTitle = ({ userType, transaction, transactionContent, id }) => {
    const [uploading, setUploading] = useState(false);
    const { url, setUrl } = useContext(ImageContext);
    const [fileUrl, setFileUrl] = useState('');
    const [upload, setupload] = useState(false);
    const [receiveFile, setReceiveFile] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setUploading(true);
            },
            (error) => {
                console.error(error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUrl(downloadURL);
                    setUrl(downloadURL); // Store the URL in context
                    console.log('File available at:', downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    const handleSubmitSeller = async () => {
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_legalTitle_014`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    content: fileUrl,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data.message); // Successfully uploaded message
            }
        } catch (error) {
            console.error('Error submitting contract upload:', error);
        }
    };
    const handleSubmitBuyer = async () => {

        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_legalTitle_015`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    content: fileUrl,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Successfully uploaded message
            }
        } catch (error) {
            console.error('Error submitting contract upload:', error);
        }
    };


    useEffect(() => {
        console.log("Legal document", transactionContent.legal_title_document)
    }, [transactionContent.legal_title_document])


    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Transfer of title</h2>
                {userType === "buyer" && <p>Congratulations! You have now successfully purchased this real estate property. Please download and view the Title of Deed for the property.</p>}
                {userType === "agent" && <p>Congratulations! You have now successfully sold this real estate property. Please download and view the Title of Deed for the property.</p>}
                {userType === "property_seeker" && <p>The Seller and their Representative has sent over a Legal Title document. download and go through the document with the buyer, and if it is satisfactory, sign and upload a copy to the Seller.</p>}
                {userType === "Real_estate_agent" && <p>{"Please upload and send over the Legal Title document for the Real Estate property to the Buyer who has purchased the property."}</p>}

                <div className={styles.container}>
                    {userType === "buyer" || userType == "agent" && (
                        <div className={styles.fileContainer}>
                            <section id={styles.file_upload}>
                                <label>
                                    {transactionContent?.legal_title_document_unsigned !== null &&
                                        <img src={transactionContent?.legal_title_document_unsigned} alt="Uploaded document" />
                                    }
                                </label>
                            </section>

                            <div className={styles.buttonContainer}>
                                <a href={transactionContent?.legal_title_document_unsigned} download className={styles.download}><em>Download Contract</em></a>
                            </div>
                        </div>
                    )}

                    {userType === "property_seeker" && (
                        <div className={styles.fileContainer}>
                            <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>
                                    <label>
                                        {transactionContent.legal_title_document_unsigned &&
                                            <img src={transactionContent.legal_title_document_unsigned} alt="Uploaded document" />
                                        }
                                    </label>
                                    {transactionContent.legal_title_document_unsigned && <button style={{ background: "green" }} className={styles.fileuploadButton}>Received</button>}
                                </div>
                            </section>





                            <div className={styles.buttonContainer}>
                                <a href={transactionContent.legal_title_document_unsigned} download className={styles.download}><em>Download Contract</em></a>
                                <button onClick={() => setupload(true)} className={styles.download}>Upload Document</button>
                            </div>



                            {!transactionContent?.legal_title_document_signed && <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>
                                    <label>
                                        {fileUrl ? (
                                            <img src={fileUrl} alt="Uploaded document" />
                                        ) : (
                                            <p>Upload Document</p>
                                        )}
                                        <input type="file" onChange={handleImageChange} disabled={uploading} />
                                    </label>
                                    {uploading && <p>Uploading...</p>}
                                </div>
                            </section>
                            }


                            {transactionContent?.legal_title_document_signed && <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>

                                    <label>

                                        <img src={transactionContent?.legal_title_document_signed} alt="Uploaded document" />

                                    </label>

                                    {transactionContent?.legal_title_document_signed && <button style={{ background: "green" }} className={styles.fileuploadButton}>Sent</button>}
                                    {fileUrl && <button onClick={handleSubmitBuyer} style={transactionContent?.legal_title_document_signed ? { background: "green" } : null} className={styles.fileuploadButton}>{transactionContent?.legal_title_document_signed ? <p>Sent!</p> : <p>Send</p>}</button>}
                                </div>
                            </section>
                            }


                        </div>
                    )}


                    {userType === "Real_estate_agent" && (
                        <div className={styles.fileContainer}>
                            <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>
                                    <label>
                                        {transactionContent?.legal_title_document_signed &&
                                            <img src={transactionContent?.legal_title_document_signed} alt="Uploaded document" />
                                        }
                                    </label>

                                    {transactionContent?.legal_title_document_signed && <button className={styles.fileuploadButton} style={{
                                        background: "green"
                                    }}>Received</button>}
                                </div>
                            </section>


                            <div className={styles.buttonContainer}>
                                <a href={transactionContent.legal_title_document_unsigned} download className={styles.download}><em>Download Contract</em></a>
                                <button onClick={() => setupload(true)} className={styles.download}>Upload Document</button>
                            </div>



                            {!transactionContent?.legal_title_document_unsigned && <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>
                                    <label>
                                        {fileUrl ? (
                                            <img src={fileUrl} alt="Uploaded document" />
                                        ) : (
                                            <p>Upload Document</p>
                                        )}
                                        <input type="file" onChange={handleImageChange} disabled={uploading} />
                                    </label>
                                    {uploading && <p>Uploading...</p>}
                                </div>
                            </section>
                            }

                            {transactionContent?.contract_upload_unsigned_seller && <section id={styles.file_upload}>
                                <div className={styles.contractContainer}>

                                    <label>

                                        <img src={transactionContent?.legal_title_document_unsigned} alt="Uploaded document" />

                                    </label>
                                    {!transactionContent?.legal_title_document_unsigned ? <button onClick={handleSubmitSeller} className={styles.fileuploadButton}>send</button> : <button className={styles.fileuploadButton} style={{
                                        background: "green"
                                    }}>Sent</button>}
                                </div>
                            </section>}



                        </div>
                    )}

                </div>
            </section>
        </div>
    )
}