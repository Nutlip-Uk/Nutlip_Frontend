import styles from "../../styles/Mortgage/FindBroker.module.css";
import Image  from 'next/image';
export default function FindBroker() {
  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <article className={styles.Header}>
          <h3>Find a mortgage broker</h3>
          <p>
            It is a long established fact that a reader will be distracted by{" "}
          </p>
        </article>

        <div className={styles.BoxContainer}>
          <div className={styles.Box}>
            <Image
              src="/images/question-answer.svg"
              width={50}
              height={50}
              alt="thumbnail"
            />
            <div className={styles.TextContainer}>
              <h3>Answer a few questions </h3>
              <p>
                Tell us a little about your loan needs and the home you want to
                buy or refinance
              </p>
            </div>
          </div>

          <div className={styles.Box}>
            <Image
              src="/images/database.svg"
              width={50}
              height={50}
              alt="thumbnail"
            />
            <div className={styles.TextContainer}>
            <h3>Get data driven results</h3>
            <p>
              Tell us a little about your loan needs and the home you want to
              buy or refinance
            </p>
            </div>
          </div>

          <div className={styles.Box}>
            <Image
              src="/images/phone-in-talk.svg"
              width={50}
              height={50}
              alt="thumbnail"
            />
            <div className={styles.TextContainer}>
            <h3>Talk to a broker</h3>
            <p>
              Tell us a little about your loan needs and the home you want to
              buy or refinance
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
