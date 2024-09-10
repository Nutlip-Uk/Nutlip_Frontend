import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ImageContext } from '../../context/ImageContext.context';
import styles from "../../styles/BuyerProcess/Funds.module.css";
import Button from '../styled components/Button';
import Skeleton from '@mui/joy/Skeleton';


export const Funds = ({ userType, id, transactionContent, isLoading }) => {
  const [uploading, setUploading] = useState(false);
  const { url, setUrl } = useContext(ImageContext);
  const [fileUrl, setFileUrl] = useState('');



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
      const response = await fetch('https://nutlip-backend-yhfz.onrender.com/api/transaction/transaction_uploadproofoffunds_01', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: id,
          content: url,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error uploading proof of funds', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('https://nutlip-backend-yhfz.onrender.com/api/transaction/transaction_confirmproofoffunds_02', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error confirming proof of funds', error);
    }
  };

  return (
    <div className={styles.offer}>
      <section>
        <h2 className='text-2xl font-bold'>Funds Verification</h2>
        {userType === "property_seeker" && (
          <p>Thank you for showing interest in this real estate property. Please upload proof of funds or a mortgage in principle document.</p>
        )}
        {userType === "Real_estate_agent" && (
          <p>The buyer has provided Proof of Funds, or Mortgage in Principle document. Please view the attached document and confirm receipt.</p>
        )}
      </section>

      {userType === "property_seeker" && (
        <div className={styles.fileContainer}>
          <section id={styles.file_upload}>
            <label>
              {fileUrl || transactionContent.proof_of_funds ? (
                <img src={fileUrl || transactionContent.proof_of_funds} width={250} height={200} alt="Uploaded document" />
              ) : (
                'Upload Document'
              )}
              <input required type="file" onChange={handleImageChange} disabled={uploading} />
            </label>
            {uploading && <p>Uploading...</p>}
          </section>
          {!transactionContent?.proof_of_funds && <button className={styles.fileuploadButton} onClick={handleSubmit}>Continue</button>}
          {transactionContent?.proof_of_funds && <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Uploaded</button>}
        </div>
      )}

      {userType === "Real_estate_agent" && (
        <div className={styles.fileContainer}>
          <section id={styles.file_upload} className='relative rounded-e-lg'>
            <label>
              {!transactionContent?.proof_of_funds && 'User has not uploaded Funds document yet'}
              {transactionContent?.proof_of_funds && (
                <Skeleton className="relative w-auto rounded-lg" loading={isLoading} height={"100%"}>
                  <img src={transactionContent?.proof_of_funds} width={250} height={200} alt="Uploaded document" />
                </Skeleton>
              )}
            </label>
          </section>
          {!transactionContent?.confirm_proof_of_funds ? (
            <button className={styles.fileuploadButton} onClick={handleConfirm}>Confirm Funds</button>
          ) : (
            <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Confirmed</button>
          )}
        </div>
      )}


      {
        userType === "conveyancer_seller" && (
          <div>
            Conveyancer Seller

            <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Confirmed</button>
          </div>
        )
      }
      {
        userType === "conveyancer_buyer" && (
          <div>
            Conveyancer Buyer

            <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Confirmed</button>
          </div>
        )
      }
    </div>
  );
};

export const FundsVerify = () => {
  return (
    <div className={styles.offer}>
      <section>
        <h2>Funds Verification</h2>
        <p>The Seller has now received and confirmed your proof of funds for the purchase of the real estate property showing commitment to this transaction.</p>
      </section>

      <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content="Funds Confirmed!" />
    </div>
  );
};
