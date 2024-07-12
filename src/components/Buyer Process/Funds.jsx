import React, { useState, useContext, useEffect } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ImageContext } from '../../context/ImageContext.context';
import styles from "../../styles/BuyerProcess/Funds.module.css";
import Button from '../styled components/Button';

export const Funds = ({ userType, id }) => {
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState('upload'); // Manage the current step
  const { url, setUrl } = useContext(ImageContext);
  const [fileUrl, setFileUrl] = useState('');
  const [confirmed, setConfirmed] = useState(false);

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
      const response = await fetch(`/api/transaction/01_uploadProofOfunds/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setStep('verify'); // Switch to the verification step
      }
    } catch (error) {
      console.error('Error submitting proof of funds:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/transaction/02_confirmProofOfFunds/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirm_proof_of_funds: true }),
      });

      if (response.ok) {
        setConfirmed(true); // Set the confirmation status to true
      }
    } catch (error) {
      console.error('Error confirming proof of funds:', error);
    }
  };

  useEffect(() => {
    if (userType === "agent") {
      const fetchFile = async () => {
        try {
          const response = await fetch(`/api/transaction/01_uploadProofOfunds/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setFileUrl(data.proof_of_funds);
        } catch (error) {
          console.error('Error fetching file:', error);
        }
      };
      fetchFile();
    }
  }, [userType, id]);

  if (step === 'verify') {
    return <FundsVerify />;
  }

  return (
    <div className={styles.offer}>
      <section>
        <h2>Funds Verification</h2>
        <p>Thank you for showing interest in this real estate property. Please upload proof of funds or a mortgage in principle document.</p>
      </section>

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
        {fileUrl && <button onClick={handleSubmit} className={styles.fileuploadButton}>Continue</button>}
      </div>

      {userType === "agent" && (
        <div className={styles.fileContainer}>
          <section id={styles.file_upload}>
            <label>
              {!fileUrl && `User has not uploaded Funds document yet`}
              {fileUrl && <img src={fileUrl} width={250} height={200} alt="Uploaded document" />}
            </label>
            {fileUrl && <a href={fileUrl} download>Download Document</a>}
          </section>
          {fileUrl && (
            <button className={styles.fileuploadButton} onClick={handleConfirm}>
              {confirmed ? 'Funds Confirmed' : 'Confirm Funds'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
