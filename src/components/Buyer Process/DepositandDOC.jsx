import Image from "next/image";
import styles from "../../styles/BuyerProcess/DepositandDoc.module.css";
import { useContext, useState } from "react";
import { ImageContext } from "../../context/ImageContext.context";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { LoginContext } from "../../context/Login.context";


export const Deposit = ({ userType, transaction, transactionContent, id }) => {
  const [uploading, setUploading] = useState(false);
  const { url, setUrl } = useContext(ImageContext);
  const [fileUrl, setFileUrl] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    accountName: "",
    accountNo: "",
    bankName: "",
    IBAN: "",
    sortCode: ""
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isAccountInfoSent, setIsAccountInfoSent] = useState(false);
  const { userInformation } = useContext(LoginContext);


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


  const handleChange = (e) => {
    let newFile = URL.createObjectURL(e.target.files[0]);
    setFile(newFile);
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = userType === "property_seeker" ? "dummy proof of 10% deposit" : form;
    console.log(content);

    try {
      const response = await fetch("https://nutlip-backend.onrender.com/api/transaction/transaction_proofoffunds10_08_upload_bankdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: id,
          userId: userInformation.user.id,
          form
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const HandleUploadProofOfFunds = async () => {
    try {
      const response = await fetch("https://nutlip-backend.onrender.com/api/transaction/transaction_proofoffunds10_08", {
        method: "POST",
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
        console.log(data);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleConfirm = async () => {
    try {
      const response = await fetch("https://nutlip-backend.onrender.com/api/transaction/transaction_confirmproofoffunds_09", {
        method: "POST",
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
      <section className={styles.Header}>
        <h2>{"10% Deposit"}</h2>

        {userType === "property_seeker" && (
          <p>
            Please deposit 10% (percent) of the total amount of money the Seller
            is to receive into the designated bank account of the Seller. Then
            upload evidence of payment to Seller. Bank Account details are
            below:
          </p>
        )}

        {userType === "Real_estate_agent" && (
          <p style={{ textWrap: "wrap" }}>
            Please provide the details of your designated bank account below,
            for which the buyer can deposit 10 percent of the total amount
            accepted for the purchase of the Real Estate property.
          </p>
        )}

        <br />
        {userType === "Real_estate_agent" && (
          <strong>Amount : € {transaction.offer.PriceOffer * 0.1}</strong>
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
                <img src={fileUrl} alt="Uploaded document" />
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
                <button style={{ background: "green", maxWidth: "30%" }} className={styles.confirm} disabled>Sent</button>
              ) : (
                <button type="button" style={{ maxWidth: "30%" }} onClick={() => setIsAccountInfoSent(true)} className={styles.confirm}>Send</button>
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
                  <button className={styles.fileuploadButton} style={!transaction?.confirm_proof_of_funds_90 ? { background: "green" } : { background: "red" }} onClick={!transaction?.confirm_proof_of_funds_90 ? handleConfirm : null}>{!transaction?.confirm_proof_of_funds_90 ? "Confirmed Funds" : "confirm funds"}</button>
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


export const DOC = ({ transaction, id, userType, transactionContent }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDayChange = (e) => setSelectedDay(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = `${selectedDay} ${selectedMonth} ${selectedYear}`;
    console.log(date);
    console.log(transaction.offerId);
    console.log(id)
    try {
      const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_setdate_010`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: id,
          date: date,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Date successfully sent: ${data}`);
      }

    } catch (error) {
      console.log(`Failed to send date: ${error.message}`);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(transaction.offerId);
    try {
      const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_confirmdate_011`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: id,
          content: ""
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("date successfully confirmed:", data);
      }
    } catch (error) {
      console.log("Failed to confirm date:", error);
    }
  }

  return (
    <div className={styles.offer}>
      <section id={styles.text}>
        <h2>Date for Conclusion</h2>
        <p>
          The date for completion agreed upon by all participants in this
          transaction for the sale/purchase of the real estate property is shown
          below.
        </p>
      </section>

      {userType == "property_seeker" && <form className={styles.DateContainer} onSubmit={handleSubmit}>
        <label>Select</label>

        <div className={styles.selectContainer}>
          <select value={selectedDay} onChange={handleDayChange}>
            <option value="" disabled>
              Select Day
            </option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="" disabled>
              Select Month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select value={selectedYear} onChange={handleYearChange}>
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button style={{ background: "red", color: "white" }} type="submit">Set Date</button>
      </form>}

      {
        userType == "Real_estate_agent" &&
        <form className={styles.DateContainer}>
          <input disabled className={styles.dateConfirmation} type="text" name="" id="" value={!transactionContent?.completion_date == "" ? transactionContent.completion_date : "Date not yet set"} />
          <button style={{ background: "red", color: "white" }} onClick={handleConfirm}>Confirm</button>
        </form>
      }
    </div>
  );
};