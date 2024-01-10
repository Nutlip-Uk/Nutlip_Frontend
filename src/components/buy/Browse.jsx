import styles from "../../styles/buy/browse.module.css";
import { motion } from 'framer-motion';

export default function Browse() {
  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -50 },
                }}className={styles.TextContainer}>
          <div className={styles.Header}>
            <p>Browse thousands of available properties. </p>
          </div>

          <div className={styles.Text}>
            <p>
              {
                "With thousands of properties waiting to be discovered, you have the power to explore, compare, and make a choice that perfectly aligns with your dreams and desires. Whether you're seeking the comfort of a cozy family home, the convenience of an urban apartment, the possibilities of a commercial space, Nutlip offers a diverse array of properties to cater to your distinct needs and preferences."
              }
            </p>

            <p>
            Every property listing you encounter within this vast collection is a potential match for your future, offering not only a physical space but a gateway to a new chapter in your life. High-quality imagery and detailed descriptions ensure that you have all the information necessary to make an informed decision. 
            </p>
          </div>
        </motion.div>

        <motion.div  initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: 50 },
                }} className={styles.imgContainer}>
          <img src="/browseimg.png" alt="" className={styles.Image} />

          <div className={styles.accessContainer}>
            <div className={styles.access}>
              <img src="/stars.png" alt="" className={styles.stars} />
              <p>Get access to 1000+ properties</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
