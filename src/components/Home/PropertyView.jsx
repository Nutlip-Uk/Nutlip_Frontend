import styles from "../../styles/Home/PropertyView.module.css";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { TbRotate360 } from "react-icons/tb";
import { motion } from "framer-motion";

const PropertyView = () => {
  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.MainImageContainer}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={{
            visible: { x: 0 },
            hidden: { x: -80 },
          }}
          className={styles.left}
        >
          <img
            src="/images/propertyview.png"
            alt=""
            className={styles.leftImage}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            className={styles.ImageComp}
          >
            <img src="/stars.png" alt="" className={styles.stars} />
            <p>Access 1000+ properties</p>
            <div className={styles.propInput}>
              <FaSearch className={styles.search} />
              <input type="text" placeholder="view property type" />
            </div>
          </motion.div>
        </motion.div>

        <div className={styles.ToprightBottom}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 80 },
              }}
              className={styles.rightone}
            >
              <BiSolidVideos className={styles.icon} />
              <p className={styles.RightSmallTextHead}>Videos</p>
              <p className={styles.RightSmallText}>
                Property videos offers enhanced property presentation, increased
                engagement and reach, improved emotional connections, time and
                cost-efficiency , and higher conversion rates.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              className={styles.rightTwo}
            >
              <TbRotate360 className={styles.icon} />
              <p className={styles.RightSmallTextHead}>360 Tour</p>
              <p className={styles.RightSmallText}>
                Property virtual tour 360 through its immersive experience,
                captivate viewers, generate higher numbers of leads, and attract
                a wider audience . The transparency and convenience they provide
                also foster trust among buyers. wider
              </p>
            </motion.div>
          </div>

        </div>

        <div className={styles.right}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 80 },
            }}
            className={styles.rightHeader}
          >
            <p>Property View Option Only on Nutlip</p>
            <p>
              Now, you have the wonderful opportunity to explore properties in
              the format that suits you best. Whether you prefer pictures,
              videos, or even virtual tours, the choice is yours! Immerse
              yourself in the world of properties and find the perfect fit for
              your needs. With this variety of options, you can make an informed
              decision and enjoy the journey too!
            </p>
          </motion.div>

          <div className={styles.rightBottom}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 80 },
              }}
              className={styles.rightone}
            >
              <BiSolidVideos className={styles.icon} />
              <p className={styles.RightSmallTextHead}>Videos</p>
              <p className={styles.RightSmallText}>
                Property videos offers enhanced property presentation, increased
                engagement and reach, improved emotional connections, time and
                cost-efficiency , and higher conversion rates.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              className={styles.rightTwo}
            >
              <TbRotate360 className={styles.icon} />
              <p className={styles.RightSmallTextHead}>360 Tour</p>
              <p className={styles.RightSmallText}>
                Property virtual tour 360 through its immersive experience,
                captivate viewers, generate higher numbers of leads, and attract
                a wider audience . The transparency and convenience they provide
                also foster trust among buyers. wider
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
