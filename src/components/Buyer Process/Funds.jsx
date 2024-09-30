import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
<<<<<<< HEAD
import { ImageContext, useImageContext } from '../../context/ImageContext.context';
=======
import { ImageContext } from '../../context/ImageContext.context';
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
import styles from "../../styles/BuyerProcess/Funds.module.css";
import Button from '../styled components/Button';


export const Funds = ({ userType, id, transactionContent, isLoading, handleBackClick, handleNextClick, currentStage, transactionNames }) => {
  const [uploading, setUploading] = useState(false);
  const { url, setUrl } = useContext(ImageContext);
  const [fileUrl, setFileUrl] = useState('');
<<<<<<< HEAD
  const { loading, setLoading } = useImageContext();
=======

>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731


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
<<<<<<< HEAD
    setLoading(true);
=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
    try {
      const response = await fetch('https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_uploadproofoffunds_01', {
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
<<<<<<< HEAD
        setLoading(false);
      } else {
        console.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error uploading proof of funds', error);
      setLoading(false);
=======
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error uploading proof of funds', error);
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
    }
  };

  const handleConfirm = async () => {
<<<<<<< HEAD
    setLoading(true);
=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
    try {
      const response = await fetch('https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_confirmproofoffunds_02', {
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
<<<<<<< HEAD
        setLoading(false);
      } else {
        console.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error confirming proof of funds', error);
      setLoading(false);
    }
  };

=======
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error confirming proof of funds', error);
    }
  };


  const handleCheck = () => {

  }
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  return (
    <>
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
<<<<<<< HEAD
  <section id={styles.file_upload} className='relative rounded-e-lg flex flex-col items-start'>
    <label >
=======
            <section id={styles.file_upload} className='relative rounded-e-lg'>
        <label>
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
          {!transactionContent?.proof_of_funds && 'User has not uploaded Funds document yet'}
          {transactionContent?.proof_of_funds && (

            <img src={transactionContent?.proof_of_funds} width={250} height={200} alt="Uploaded document" />

          )}
        </label>
<<<<<<< HEAD
  <a href={transactionContent?.proof_of_funds} download className={`text-blue-900 font-semibold border-b-2 border-blue-900`}><em>Download Contract</em></a>
=======
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
            </section >
  {!transactionContent?.confirm_proof_of_funds ? (
    <button className={styles.fileuploadButton} onClick={handleConfirm}>Confirm Funds</button>
  ) : (
    <button className={styles.fileuploadButton} style={{ backgroundColor: "green" }}>Funds Confirmed</button>
  )}
          </div >
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
      </div >

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
      disabled={!transactionContent?.confirm_proof_of_funds}
      className={`flex items-center gap-2 text-red-600 border-b border-red-600 text-base font-medium ${currentStage >= transactionNames?.length - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }  ${transactionContent?.confirm_proof_of_funds ? "" : "text-gray-600 border-gray-600 opacity-25 "}`}
    >
      Next : <span>{"Add Conveyancer"}</span>
    </button>
  </div>
    </>
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
