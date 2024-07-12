import Image from 'next/image'
import styles from "../../styles/BuyerProcess/Contract.module.css"
import { useContext, useEffect, useState } from 'react';
import { ImageContext } from '../../context/ImageContext.context';


export const Contract = ({userType, transaction, id}) => {
    const [uploading, setUploading] = useState(false);
    const [step, setStep] = useState('upload'); // Manage the current step
    const { url, setUrl } = useContext(ImageContext);
    const [fileUrl, setFileUrl] = useState('');
    const [receiveFile, setReceiveFile] = useState(false);
    const [upload, setupload] = useState(false);

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
                    setUrl(downloadURL);
                    console.log('File available at:', downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/transaction/06_contractupload/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contract_upload }),
            });

        } catch (error) {
            console.error('Error submitting proof of funds:', error);
        }
    }

   useEffect(() => {
    const GetContract= async()=>{
        try {
            const response = await fetch(`/api/transaction/06_contractupload/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setReceiveFile(data.contract_upload);
            }
        } catch (error) {
            console.error('Error getting contract:', error);
        }
    }

    GetContract();
   })

    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Contract Upload</h2>
                {userType === "buyer" && <p>Your representative has confirmed receipt of the Contract document from the Seller for the sale of the real estate property. Please view the Contract document attached below</p>}
                {userType === "agent" && <p>Your representative has sent over the Contract document for the sale of this real estate property. Please view the Contract document attached below.</p>}
                {userType === "Buyer_conveyancer" && <p>It is now the Exhange of Contract process. The Agent/Seller Conveyancer has sent over the Contract. Please go through the Contract and if satisfied,  sign and send a copy back to the Seller/Agent Conveyancer.</p>}
                {userType === "Agent_conveyancer" && <p>It is now the Exchange of Contract process. Please upload the Contract for the Sale of the Real Estate Property to the Buyer's Conveyancer. </p>}
            </section>

            {userType === "buyer" || userType == "agent" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {receiveFile &&
                                <img src={receiveFile} width={250} height={200} alt="Uploaded document" />
                            }
                        </label>
                    </section>

                    <div className={styles.buttonContainer}>
                        <a href={receiveFile} download className={styles.download}><em>Download Contract</em></a>
                    </div>
                </div>
            )}

            {userType === "Buyer_conveyancer" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {receiveFile &&
                                <img src={receiveFile} width={250} height={200} alt="Uploaded document" />
                            }
                        </label>
                    </section>


                    <div className={styles.buttonContainer}>
                        <a href={receiveFile} download className={styles.download}><em>Download Contract</em></a>
                        <button onClick={() => setupload(true)} className={styles.download}>Upload Document</button>
                    </div>



                    {upload && <section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                <p>Upload Document</p>
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                    </section>
                    }


                    {fileUrl && <button onClick={handleSubmit} className={styles.fileuploadButton}>send</button>}
                </div>
            )}


            {userType === "Agent_conveyancer" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {receiveFile &&
                                <img src={receiveFile} width={250} height={200} alt="Uploaded document" />
                            }
                        </label>
                    </section>


                    <div className={styles.buttonContainer}>
                        <a href={receiveFile} download className={styles.download}><em>Download Contract</em></a>
                        <button onClick={() => setupload(true)} className={styles.download}>Upload Document</button>
                    </div>



                    {upload && <section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                <p>Upload Document</p>
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                    </section>
                    }


                    {fileUrl && <button onClick={handleSubmit} className={styles.fileuploadButton}>send</button>}
                </div>
            )}
        </div>
    )
}