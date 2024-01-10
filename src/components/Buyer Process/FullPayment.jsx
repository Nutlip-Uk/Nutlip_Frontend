/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import { useState } from 'react';


export const FullPayment = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }

    return (
        <div className={styles.offer}>
            <section>
                <h2>Full Payment</h2>
                <p>The Seller has confirmed receipt of full payment for the purchase of the real estate property. The Seller's bank account details are stated below. Please download and view the attached document showing Proof of Full Payment to the Seller.</p>
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