import styles from "../../styles/sell/SellTraditionally.module.css";
import Image  from 'next/image';
import { router } from "next/router";

export default function SellTraditionally() {

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/sell/selltraditionally")
  };

  return (
    <div className={styles.Section}>
      <div className={styles.Container}>-
        
        <article className={styles.TextContainer}>
          <h3>{"Sell traditionally with an agent and close 60% faster."}</h3>
          <p>
          Collaborate with a professional real estate agent to receive comprehensive assistance throughout the entire selling process, encompassing preparations, listing, and effective marketing of your property on Nutlip.
          </p>
          <button onClick={handleSubmit}>Contact Selling Agent</button>
        </article>

        <div className={styles.ImgContainer}>
          <Image
            src="/sell/selltraditionally.png"
            width={650}
            height={400}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
}
