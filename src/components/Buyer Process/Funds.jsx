import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import { useState } from 'react';
import Button from '../styled components/Button';


export const Funds = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }

    return (
        <div className={styles.offer}>
            <section>
                <h2>Funds Verification</h2>
                <p>Thank you for showing interest in this real estate property. Please upload proof of funds or a mortgage in principle document.</p>
            </section>

            <section id={styles.file_upload}>
                <label>
                    {!file && `Upload Document`}
                    <input type="file" onChange={handleChange}/>
                    {file && <Image src={file} width={250} height={200} alt={file}/>}
                </label>
                <button><em>Upload Document</em></button>
            </section>

            {file && <Button bgcolor="#DA0025" textcolor="#FFF" width="100" content="Send Document"/>}

        </div>
    )
}


export const FundsVerify = () => {
    return(
        <div className={styles.offer}>
            <section>
                <h2>Funds Verification</h2>
                <p>The Seller has now received and confirmed your proof of funds for the purchase of the real estate property showing commitment to this transaction.</p>
            </section>

            <Button bgcolor="#16AA63" textcolor="#FFF" width="100" content="Funds Confirmed!"/>

        </div>
    )
}