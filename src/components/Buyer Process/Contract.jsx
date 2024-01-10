import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import { useState } from 'react';


export const Contract = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }

    return(
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Contract download</h2>
                <p>Your representative has confirmed receipt of the Contract document from the Seller for the sale of the real estate property. Please view the Contract document attached below</p>
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