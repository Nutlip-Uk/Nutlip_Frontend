import styles from "../../styles/Home/Revolutionizing.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import React from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";


const Revolutionizing = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -30 },
          }}
          className={styles.MainText}
        >
          <div className={styles.textContainer}>
          <p>Lets make your selling and buying easy as <span>1 | 2 | 3</span></p>
            <p>
            Our platform ensures a seamless experience for selling and buying, making transactions effortless, straightforward and stress-free from start to finish. Our user-friendly features and streamlined process ensure that you can focus on what matters most – finding the perfect buyer or your dream property – without worrying about the complexities of the transaction.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 50 },
          }}
          className={styles.Video}
        >
          <iframe
                      className={styles.VideoTag}
                      src="https://www.youtube.com/embed/x6pyfOau-sQ?si=aODDF0wIEyNB3M-p"
                      title="Nutlip"
                      allowFullScreen
                    ></iframe>

        </motion.div>
      </div>
    </section>
  );
};

export default Revolutionizing;