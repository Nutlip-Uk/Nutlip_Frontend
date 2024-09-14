import Image from "next/image";
import styles from "../../styles/BuyerProcess/DepositandDoc.module.css";
import { useContext, useState } from "react";
import { ImageContext } from "../../context/ImageContext.context";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { LoginContext } from "../../context/Login.context";


export const Deposit = ({ userType, transaction, transactionContent, id }) => {
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
    try {
      console.log("BANK DETAILS", form);
      const response = await fetch("https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_proofoffunds10_08_upload_bankdetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          form
        ),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("RESPONSE FOR BANK DETAILS SENT", data.message);
      }

    } catch (error) {
      console.error("Error submitting bank details:", error);
    }
  };

  const HandleUploadProofOfFunds = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_proofoffunds10_08", {
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
        console.log(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_confirmproofoffunds_09", {
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
        console.log(data.message);
        setConfirmed(true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.offer}>
      <section className={styles.Header}>
        <h2 className="text-xl font-semibold">{"10% Deposit"}</h2>

        {userType === "conveyancer_buyer" && (
          <p>
            Please deposit 10% (percent) of the total amount of money the Seller
            is to receive into the designated bank account of the Seller. Then
            upload evidence of payment to Seller. Bank Account details are
            below:
          </p>
        )}

        {userType === "conveyancer_seller" && (
          <p style={{ textWrap: "wrap" }}>
            Please provide the details of your designated bank account below,
            for which the buyer can deposit 10 percent of the total amount
            accepted for the purchase of the Real Estate property.
          </p>
        )}
        {userType === "property_seeker" && (
          <p style={{ textWrap: "wrap" }}>
            The Seller has confirmed receipt of the 10% (percent) deposit payment into the designated bank account provided by the Seller for the sale of the real estate property. Below are the bank details provided by the Seller. Please download and view the Proof of Payment document attached.
          </p>
        )}
        {userType === "Real_estate_agent" && (
          <p style={{ textWrap: "wrap" }}>
            The 10% deposit has been paid into the bank account details provided below. Your representative has confirmed receipt of funds. Please download and view the Proof of Payment document attached.          </p>
        )}



        <br />
        {userType === "conveyancer_seller" && (
          <strong>Amount : € {transaction.offer.PriceOffer * 0.1}</strong>
        )}
      </section>



      {
        (userType === "property_seeker" || userType === "Real_estate_agent") && (
          <div>
            {!transactionContent?.proof_of_funds_10 ? (
              <div>
                <p className="text-red-500 font-semibold">10% deposit yet to be confirmed by Seller Conveyancer...</p>
              </div>
            ) : (

              <div className={styles.fileContainer}>
                <section id={styles.file_upload}>
                  <label>
                    {transactionContent?.proof_of_funds_10
                      === "" ? (
                      "User has not uploaded Funds document yet"
                    ) : (
                      <img src={transactionContent?.proof_of_funds_10
                      } alt="Uploaded document" />
                    )}
                  </label>
                </section>
                {transactionContent?.confirm_proof_of_funds_10 &&

                  (
                    <button className={`min-w-fit w-full text-white text-green-700 p-2 rounded-md `} style={{ backgroundColor: "green" }} >Funds Confirmed</button>
                  )
                }
              </div>

            )}
          </div>
        )
      }

      {userType === "conveyancer_buyer" && (
        <section className={styles.list}>
          <p className="font-semibold">SELLER BANK DETAILS</p>
          {transactionContent?.bankdetails?.length > 0 ? (
            <ul>
              <li>Bank name: {transactionContent.bankdetails[0].bankName}</li>
              <li>Sort code: {transactionContent.bankdetails[0].sortcode}</li>
              <li>Account number: {transactionContent.bankdetails[0].accountNo}</li>
              <li>Account name: {transactionContent.bankdetails[0].accountName}</li>
              <li>IBAN: {transactionContent.bankdetails[0].IBAN}</li>
              <li>Amount: € {transaction?.offer?.PriceOffer * 0.9}</li>
            </ul>
          ) : (
            <p className="text-red-400">Agent is yet to send bank details ...</p>
          )}
        </section>
      )}

      {userType === "conveyancer_buyer" && (
        <div className={styles.fileContainer}>
          {!transactionContent.proof_of_funds_10 && <section id={styles.file_upload}>
            <label>
              {fileUrl ? (
                <img src={fileUrl} alt="Uploaded document" />
              ) : (
                'Upload Document'
              )}
              <input type="file" onChange={handleImageChange} disabled={uploading} />
            </label>
            {uploading && <p>Uploading...</p>}
          </section>}

          {transactionContent.proof_of_funds_10 && <section id={styles.file_upload}>
            <label>
              <img src={transactionContent.proof_of_funds_10} alt="Uploaded document" />

            </label>
          </section>}
          {transactionContent?.proof_of_funds_10 == null ? <button className={styles.fileuploadButton} onClick={HandleUploadProofOfFunds} >Continue</button> : <button style={{ background: "green" }} className={styles.fileuploadButton} >Upload Sent</button>}
        </div>
      )}

      {userType === "conveyancer_seller" && (
        <>
          {transactionContent.bankdetails[0] || confirmed ? (
            <section className={styles.formContainer}>
              <p className={styles.formHeader}>{"Bank Account Details"}</p>
              {confirmed && <ul>
                <li>Bank name: {form.bankName}</li>
                <li>Sort code: {form.sortcode}</li>
                <li>Account number: {form.accountNo}</li>
                <li>Account name: {form.accountName}</li>
                <li>IBAN: {form.IBAN}</li>
                <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
              </ul>}

              {/* {
                transactionContent.bankdetails.length > 0 && transactionContent.bankdetails[0] &&
                <ul>
                  <li>Bank name: {transactionContent.bankdetails[0]?.bankName}</li>
                  <li>Sort code: {transactionContent.bankdetails[0]?.sortcode}</li>
                  <li>Account number: {transactionContent.bankdetails[0]?.accountNo}</li>
                  <li>Account name: {transactionContent.bankdetails[0]?.accountName}</li>
                  <li>IBAN: {transactionContent.bankdetails[0]?.IBAN}</li>
                  <li>Amount: € {transaction.offer.PriceOffer * 0.9}</li>
                </ul>
              } */}


              {transactionContent.bankdetails.length > 0 ? (
                <button style={{ background: "green", maxWidth: "30%" }} className={styles.confirm} >Sent</button>
              ) : (
                <button type="button" style={{ maxWidth: "30%" }} onClick={handleSubmit} className={styles.confirm}>Send</button>
              )}

              <div className={styles.fileContainer}>
                <section id={styles.file_upload}>
                  <label>
                    {transactionContent?.proof_of_funds_10
                      === "" ? (
                      "User has not uploaded Funds document yet"
                    ) : (
                      <img src={transactionContent?.proof_of_funds_10
                      } alt="Uploaded document" />
                    )}
                  </label>
                </section>
                {transactionContent?.proof_of_funds_10
                  !== "" && (
                    <button className={styles.fileuploadButton} style={transactionContent?.confirm_proof_of_funds_10 === true
                      ? { background: "green" } : { background: "red" }} onClick={handleConfirm}>{transactionContent?.confirm_proof_of_funds_10 === true
                        ? "Confirmed Funds" : "confirm funds"}</button>
                  )}
              </div>
            </section>
          ) : (
            <section className={styles.formContainer}>
              <p className={`${styles.formHeader}`}>{"Bank Account Details"}</p>
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setConfirmed(true); }}>
                <div className={styles.formInput}>
                  <label>
                    Account name
                    <input
                      type="text"
                      required
                      placeholder="Account name"
                      value={form.accountName}
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
                <button type="submit" onClick={(e) => { e.preventDefault(); setConfirmed(true); }} className={styles.confirm}>Confirm</button>
              </form>
            </section>
          )}
        </>
      )
      }
    </div >
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
    const dates = `${selectedDay} ${selectedMonth} ${selectedYear}`;
    const date = 2024
    console.log(date);

    try {
      const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_setdate_010`, {
        method: "PUT",
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
        console.log("Date successfully sent");
        console.log(`Date successfully sent: ${data.message}`);
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
      const response = await fetch(`https://nutlip-server.uc.r.appspot.com/api/transaction/transaction_confirmdate_011`, {
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
        console.log("date successfully confirmed:", data.message);
      }
    } catch (error) {
      console.log("Failed to confirm date:", error);
    }
  }

  return (
    <div className={styles.offer}>
      <section id={styles.text}>
        <h2 className="text-xl font-semibold">Date for Conclusion</h2>
        <p>
          The date for completion agreed upon by all participants in this
          transaction for the sale/purchase of the real estate property is shown
          below.
        </p>
      </section>

      {userType == "conveyancer_buyer" && <form className={styles.DateContainer} onSubmit={handleSubmit}>
        {!transactionContent.completion_date && <label>Select</label>}

        {!transactionContent.completion_date && <div className={styles.selectContainer}>
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
        </div>}

        {transactionContent.completion_date && (
          <form className={styles.DateContainer}>
            <input disabled className={styles.dateConfirmation} type="text" name="" id="" value={!transactionContent?.completion_date == "" ? transactionContent.completion_date : "Date not yet set"} />
          </form>
        )}

        <button style={transactionContent.completion_date ? { background: "green", color: "white", cursor: "pointer" } : { background: "red", color: "white", cursor: "pointer" }} type="submit" onClick={handleSubmit}>{transactionContent.completion_date ? "Sent" : " Set Date"}</button>
      </form>}

      {
        userType == "conveyancer_seller" &&
        <form className={styles.DateContainer}>
          <input disabled style={{ width: "100%" }} className={styles.dateConfirmation} type="text" name="" id="" value={!transactionContent?.completion_date == "" ? transactionContent.completion_date : "Date not yet set"} />
          <button style={transactionContent.agreeded_on_completion_date_buyer ? { background: "green", color: "white", width: "100%" } : { background: "red", color: "white" }} onClick={handleConfirm}>{transactionContent.completion_date ? "Confirmed" : "Confirm"}</button>
        </form>
      }
      {
        (userType == "Real_estate_agent" || userType == "property_seeker") &&
        <form className={styles.DateContainer}>
          <input disabled style={{ width: "100%" }} className={styles.dateConfirmation} type="text" name="" id="" value={!transactionContent?.completion_date == "" ? transactionContent.completion_date : "Date not yet set"} />
          <button className="text-white " style={transactionContent.agreeded_on_completion_date_buyer ? { backgroundColor: "green", color: "white" } : { backgroundColor: "grey", colo: "white" }} >{transactionContent.completion_date ? "Confirmed" : "Not Confirmed"}</button>
        </form>
      }


    </div>
  );
};