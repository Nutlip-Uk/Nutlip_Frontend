import Home from "../../components/Rent/Index";
import styles from "../../styles/buy/buy.module.css";
import { motion } from "framer-motion";
import BuyImage from "../../../public/buyimage.png";
import mort_con from "../../styles/Home/Mortgage_Conveyancer.module.css";
import { useRouter } from 'next/router';
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Browse from "../../components/buy/Browse";
import Roadmap from "../../components/buy/Roadmap";
import Road from "../../components/buy/Road";
import Howitworks from "../../components/buy/Howitworks";
import { Autocomplete } from "../../components/Suggestion";

const Buy = (props) => {
  return (
    <>
      <section className={styles.Section}>
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${BuyImage})` }}
        >

          <div className={styles.Textcontainer}>
            <div className={styles.Text}>
              <h2>Get the keys to your new home 3x faster </h2>
              <p>At Nutlip we know there is a better way to buy a home with ease and 60% faster than the traditional methods.</p>
            </div>
          </div>

          <div className={styles.HeroCompContainer}>
            <HeroComponent placeholder="Where do you want to Buy? e.g. Liverpool or L11" />
          </div>

        </div>
        <Howitworks />
        <Roadmap />
        <Browse />
        <Road />
      </section>
    </>
  );
};

export default Buy;

const HeroComponent = () => {
  const router = useRouter();
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
          {/* <input
            type="text"
            placeholder="Where do you want to Buy? e.g. Liverpool or L11"
          /> */}

          <Autocomplete placeholder={"Where are you buying from ?"} />
        </div>

        <div className={styles.SelectContainer}>
          {/* <input list='radius' placeholder='Radius'/> */}
          <Select
            name="duration"
            //  value={formData.duration}
            //  onChange={handleChange}
            className={styles.muti}
            multiple
            placeholder={["View type e.g video, virtual tour"]}
          >
            <Option value="Picture">Picture</Option>
            <Option value="Video">Video</Option>
            <Option value="Virtual Tour">Virtual Tour</Option>

            {/* <option value="" className='disabled'>This area only</option> */}
          </Select>
        </div>

        <a

          onClick={() => router.push(`/buy/search`)}
          id="search"
          className={styles.searchButton}
        >
          To Buy
        </a>
      </form>
    </>
  );
};