import styles from "../styles/Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <div className={`${
            router.pathname === "/register" ? styles.reg : styles.Section
          }`}>
        <footer
          className={`${
            router.pathname === "/register" ? styles.reg : styles.footer
          }`}
        >
          <div className={styles.logo}>
            <Image src="/footer_logo.svg" width={145} height={40} alt={""} />
          </div>

          <div className={styles.footerList}>
            <div id={styles.contact} className={styles.contact}>
              <h3>Contact</h3>
              {/* <li>
                <Image
                  src="/images/ic-baseline-phone.svg"
                  width={20}
                  height={20}
                  alt={""}
                />
                +33 415 65356 - 9
              </li> */}
              <li>
                <Image
                  src="/images/ic-baseline-email.svg"
                  width={20}
                  height={20}
                  alt={""}
                />
                info@nutlip.co.uk
              </li>
              <li>
                <Image
                  src="/images/ic-round-location-on.svg"
                  width={20}
                  height={20}
                  alt={""}
                />
                149-153 Harehills Road, Leeds, LS8 5BW, United Kingdom
              </li>
            </div>

            <div className={styles.footerLinkContainer}>
              <div className={styles.FooterLinks}>
                <h3>Quick Links</h3>
                <li>Home</li>
                <li>About</li>
                <li>Project</li>
                <li>Contact</li>
              </div>
              <div className={styles.FooterLinks}>
                <h3>Legal Links</h3>
                <li>Terms</li>
                <li>Conditions</li>
                <li>Policy</li>
              </div>
              <div className={styles.FooterLinks}>
                <h3>Social Media</h3>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Youtube</li>
                <li>LinkedIn</li>
              </div>
            </div>
          </div>
        </footer>

        <div className={styles.copyright}>
          <p>Copyright @ 2024 nutlip</p>
        </div>
      </div>
    </>
  );
};

export default Footer;