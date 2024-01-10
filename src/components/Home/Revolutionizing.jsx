import styles from "../../styles/Home/Revolutionizing.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Video from "../../../public/videos/nutlip.mp4";
import ReactPlayer from "react-player";
import React from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import { Videos } from '/public/videos/nutlip.mp4';

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
            <p>Revolutionizing the Real Estate Industry</p>
            <p>
              We aim to continue to transform the way people buy and sell real
              estate by making it as effortless and convenient as online grocery
              shopping and also to provide potential tenants with a seamless and
              hassle-free experience, allowing them to effortlessly discover
              their dream homes and complete the rental process through a
              single, user-friendly online platform.
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
                      src="https://www.youtube.com/embed/UevtTNOTYL0"
                      title="Nutlip"
                      allowFullScreen
                    ></iframe>

        </motion.div>
      </div>
    </section>
  );
};

export default Revolutionizing;
