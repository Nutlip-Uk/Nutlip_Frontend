import styles from "../../styles/Mortgage/Navigating.module.css";
import Image  from 'next/image';

export default function Navigating() {
  return (
    <div className={styles.Section}>
      <div className={styles.Container}>
       
        <article className={styles.TextContainer}>
          <h3>Navigating Mortgages and Finding Your Home</h3>
          <p>
          Discover the key to financial happiness and ease with our expert guidance on mortgages and finding your dream home. Make your next move the nutlip
          </p>

          <button>Find a broker</button>
        </article>

        <div className={styles.ImgContainer}>
          <Image
            src="/mortgages/navigating.png"
            width={650}
            height={400}
            alt="image"
          />
        </div>

      </div>
    </div>
  );
}
