import styles from "../../styles/Rent/Find.module.css";
const Find = () => {
  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.imgGridContainer}>
          <img className={styles.imgone} src="/rent/blueimg.png" alt="" />
          <img className={styles.imgtwo} src="/rent/lounge.png" alt="" />
          <img className={styles.imgthree} src="/rent/building.png" alt="" />
        </div>
        <div className={styles.InfoContainer}>
          <div className={styles.Header}>
            <p>Let’s find the right apartment for you</p>
          </div>

          <div className={styles.TextWrapper}>
            <div className={styles.TextContainer}>
              <img className={styles.icon} src="/check.svg" alt="" />
              <div className={styles.Text}>
                <p>Extensive Database of Quality Properties</p>
                <p>
                  Our user-friendly website and mobile app feature an intuitive
                  search interface, allowing you to effortlessly browse through
                  a wide
                </p>
              </div>
            </div>

            <div className={styles.TextContainer}>
              <img className={styles.icon}  src="/search.svg" alt="" />
              <div className={styles.Text}>
                <p>User-Friendly Search Features</p>
                <p>
                  Our user-friendly website and mobile app feature an intuitive
                  search interface, allowing you to effortlessly browse through
                  a wide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Find;
