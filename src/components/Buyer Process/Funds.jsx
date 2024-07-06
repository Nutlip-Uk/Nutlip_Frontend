import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ImageContext } from '../../context/ImageContext.context';
import styles from "../../styles/BuyerProcess/Funds.module.css";
import Button from '../styled components/Button';

export const Funds = ({ userType ,id}) => {
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
        // Progress function (optional)...
        setUploading(true);
      },
      (error) => {
        // Error function ...
        console.error(error);
        setUploading(false);
      },
      () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL); // Set the file URL for displaying the image
          setUrl(downloadURL);  // Update the context
          console.log('File available at:', downloadURL);  // Log the URL
          setUploading(false);
        });
      }
    );
  };

  const handleSubmit= async()=>{
    try {
      const response = await fetch(`/api/transaction/01_uploadProofOffunds/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url),
      });
    } catch (error) {
      
    }
  }

  return (
    <div className={styles.offer}>
      <section>
        <h2>Funds Verification</h2>
        {userType === "buyer" && (
          <p>Thank you for showing interest in this real estate property. Please upload proof of funds or a mortgage in principle document.</p>
        )}
        {userType === "agent" && (
          <p>The buyer has provided Proof of Funds, or Mortgage in Principle document. Please view the attached document and confirm receipt.</p>
        )}
      </section>

      {userType === "buyer" && (
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
          {fileUrl && <button className={styles.fileuploadButton}>Continue</button>}
        </div>
      )}

      {userType === "agent" && (
        <div className={styles.fileContainer}>
          <section id={styles.file_upload}>
            <label>
              {!fileUrl && `User has not uploaded Funds document yet`}
              {fileUrl && <img src={fileUrl} width={250} height={200} alt="Uploaded document" />}
            </label>
          </section>
          {fileUrl && <button className={styles.fileuploadButton}>Funds Confirmed</button>}
        </div>
      )}
    </div>
  );
}

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
}
