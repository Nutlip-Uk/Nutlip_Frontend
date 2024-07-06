import styles from "../../styles/sell/SellYourHome.module.css";
import Image  from 'next/image';
import { router } from "next/router";

export default function SellYourHome() {
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/sell/postyourhome")
  };

  return (
    <div className={styles.Section}>
      <div className={styles.Container}>
        <div className={styles.ImgContainer}>
          <Image
            src="/sell/sellyourhome.png"
            width={643}
            height={400}
            alt="image"
          />
        </div>
       
        <article className={styles.TextContainer}>
          <h3>List and sell your home with ease. <span style={{color:"red"}}> Close 60% faster.</span> </h3>
          <p>
          Opting to nnegotiations sell your home, commonly involves a process akin to traditional selling, yet devoid of the guidance of a real estate agent. In such instances, you take on the responsibility for tasks such as home preparation, marketing, showings, and negotiations.
          </p>

          <button onClick={handleSubmit}>Post your home for sale</button>
        </article>

       

      </div>
    </div>
  );
}