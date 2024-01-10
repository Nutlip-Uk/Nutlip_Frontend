import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import Button from '../styled components/Button'
import { useState } from 'react';


export const Deposit = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }

    return (
        <div className={styles.offer}>
            <section>
                <h2>10% Deposit</h2>
                <p>The Seller has confirmed receipt of the 10% (percent) deposit payment into the designated bank account provided by the Seller for the sale of the real estate property. Below are the bank details provided by the Seller. Please download and view the Proof of Payment document attached.</p>
            </section>

            <section id={styles.list}>
                <ul>
                    <li>Seller’s Bank Account Details</li>
                    <li>Bank name: Bank of Scotland</li>
                    <li>Sort code: 22-12-46</li>
                    <li>Account number: 01234567</li>
                    <li>Account name: Johnson Alabija</li>
                    <li>IBAN: 26784326789012</li>
                    <li>Amount: £625,148</li>
                </ul>
            </section>

            <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content="Payment Successful!"/>

            <section id={styles.file_upload}>
                <label>
                    {!file && `Upload Document`}
                    <input type="file" onChange={handleChange}/>
                    {file && <Image src={file} width={250} height={200} alt={file}/>}
                </label>
                <button><em>Download Document</em></button>
            </section>

        </div>
    )
}

export const DOC = () => {
    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Date for Completion</h2>
                <p>The date for completion agreed upon by all participants in this transaction for the sale/purchase of the real estate property is shown below.</p>
                <p id={styles.date}>26/08/2023</p>
            </section>
        </div>
    )
}