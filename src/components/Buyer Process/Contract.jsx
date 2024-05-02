import Image from 'next/image'
import styles from "../../styles/BuyerProcess/Contract.module.css"
import { useState } from 'react';


export const Contract = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }

    return(
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Contract download</h2>
                <p>Your representative has confirmed receipt of the Contract document from the Seller for the sale of the real estate property. Please view the Contract document attached below</p>
            </section>

            <section id={styles.file_upload}>
                <label>
                    {!file && `Upload Document`}
                    <input type="file" onChange={handleChange}/>
                    {file && <Image src={file} width={250} height={200} alt={file}/>}
                </label>
                <div className={styles.buttonContainer}>
                    <button className={styles.download}><em>Download Document</em></button>
                    <button className={styles.fileuploadButton}>Continue</button>
                </div>
                
            </section>
        </div>
    )
}