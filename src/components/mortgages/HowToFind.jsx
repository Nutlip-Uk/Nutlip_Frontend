import styles from "../../styles/Mortgage/HowToFind.module.css";
import Image  from 'next/image';

export default function HowToFind() {
  return (
    <div className={styles.Section}>
      <div className={styles.Container}>
        <div className={styles.ImgContainer}>
          <Image
            src="/mortgages/Howtofind.png"
            width={650}
            height={400}
            alt="image"
          />
        </div>
        <article className={styles.TextContainer}>
          <h3>How to find the best mortgage broker</h3>
          <p>
            The best lender for you will provide the type of loan {"you're"}{" "}
            looking for, whether <span>purchase loan</span>,{" "}
            <span>refinance loan</span> or <span>HELOC</span>, and {"they'll"}{" "}
            offer
          </p>
          <ul>
            <li>
              Strengthen your financial profile before contacting a mortgage
              lender
            </li>
            <li>
              Improve the terms of your mortgage by shopping and comparing
              several lenders, local and national
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
