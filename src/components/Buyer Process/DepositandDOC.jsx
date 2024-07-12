import Image from "next/image";
import styles from "../../styles/BuyerProcess/DepositandDoc.module.css";
import Button from "../styled components/Button";
import { useState } from "react";

export const Deposit = () => {
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    let newFile = URL.createObjectURL(e.target.files[0]);
    setFile(newFile);
  };

  return (
    <div className={styles.offer}>
      <section>
        <h2>First Deposit</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Document should be maximum of 2MB in these formats; png,
          jpg, pdf or doc.
        </p>
      </section>

      {/*  <section className={styles.list}>
                <ul>
                    <li>Seller’s Bank Account Details</li>
                    <li>Bank name: Bank of Scotland</li>
                    <li>Sort code: 22-12-46</li>
                    <li>Account number: 01234567</li>
                    <li>Account name: Johnson Alabija</li>
                    <li>IBAN: 26784326789012</li>
                    <li>Amount: £625,148</li>
                </ul>
            </section> */}

      <section id={styles.file_upload}>
        <label>
          {!file && `Upload Document`}
          <input type="file" onChange={handleChange} />
          {file && <Image src={file} width={250} height={200} alt={file} />}
        </label>
        <button className={styles.fileuploadButton}>Continue</button>
      </section>
    </div>
  );
};

export const DOC = ({transaction, id , userType}) => {
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

    try {
      const response = await fetch(`/api/transaction/10_setDate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(response.ok){
        alert(`Date successfully sent: ${data.date}`);
      }
    } catch (error) {
      alert(`Failed to send date: ${error.message}`);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/transaction/11_confirmdate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agreeded_on_completion_date_buyer),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(response.ok){
        alert(`Date successfully confirmed: ${data.message}`);
      }
    } catch (error) {
      alert(`Failed to confirm date: ${error.message}`);
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

      <form className={styles.DateContainer} onSubmit={handleSubmit}>
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

        <button type="submit">Set Date</button>
      </form>
    </div>
  );
};