import Image from 'next/image'
import styles from "../../styles/BuyerProcess/TitleTransfer.module.css"
import { useState } from 'react';


export const TransferTitle = () => {
    const [file, setFile] = useState('');
    const handleChange =(e) => {
        let newFile = URL.createObjectURL(e.target.files[0])
        setFile(newFile);
    }


    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Transfer of legal title</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Document should be maximum of 2MB in these formats; png, jpg, pdf or doc.</p>
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