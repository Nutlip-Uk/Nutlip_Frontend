import Image from 'next/image'
import styles from "../../styles/Transactions/OfferProcess.module.css"
import { useState } from 'react';


export const TransferTitle = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }


    return (
        <div className={styles.offer}>
            <section id={styles.text}>
                <h2>Transfer of legal title</h2>
                <p><strong>Congratulations!</strong> You have now successfully purchased this real estate property. Please download and view the Title of Deed for the property.</p>
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