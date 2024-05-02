import styles from "../../styles/Conveyancer/Discover.module.css";
import Image  from 'next/image';
import Conveyancer from './../../pages/conveyancer/index';

export default function Discover() {
  return (
    <div className={styles.Section}>
      <div className={styles.Container}>
        <div className={styles.ImgContainer}>
          <Image
            src="/conveyancer/discoverimg.png"
            width={450}
            height={400}
            alt="image"
          />
        </div>
        <article className={styles.TextContainer}>
          <h3>Discover Local Experts for Smooth Transactions</h3>
          <p>
{"          When searching for a conveyancer, it's crucial to find a qualified professional who can facilitate a smooth and legally sound property transaction. Unlock the expertise of local professionals to ensure your property transactions are smooth and hassle-free. Our platform connects you with trusted experts who understand your area's nuances, making your real estate journey effortless"}          </p>
          
        </article>
      </div>
    </div>
  );
}
