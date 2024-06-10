import styles from '../../styles/sell/Home.module.css'
import SellTraditionally from "../../components/sell/SellTraditionally";
import SellYourHome from "../../components/sell/SellYourHome";


const Sell = () => {
  return (
    <>
      <section className={styles.Section}>
        
        <div
          className={styles.container}
        >
          <div className={styles.containerText}>
            <h2>Sell faster & stress less from listing to closing.</h2>
            <p>We at Nutlip know there is a better way to sell your home and close on the transaction 60% faster.</p>
          </div>

        </div>


        <div className={styles.sellComponents}>
        <SellYourHome/>
        {/*<SellTraditionally/>*/}
        </div>
        

      </section>
    </>
  );
};

export default Sell;