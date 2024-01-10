import Home from "../../components/Rent/Index";
import styles from "../../styles/buy/buy.module.css";
import { motion } from "framer-motion";
import BuyImage from "../../../public/buyimage.png";
import mort_con from "../../styles/Home/Mortgage_Conveyancer.module.css";
import { router } from "next/router";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Browse from "../../components/buy/Browse";
import Roadmap from "../../components/buy/Roadmap";

const Buy = (props) => {
  return (
    <>
      <section className={styles.Section}>
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${BuyImage})` }}
        >
          <div className={styles.HeroCompContainer}>
            <HeroComponent />
          </div>

        </div>

        
          <Browse/>
          <Roadmap/>
      </section>
    </>
  );
};

export default Buy;

const HeroComponent = () => {
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Where do you want to Buy? e.g. Liverpool or L11"
          />
        </div>

        <div className={styles.SelectContainer}>
          {/* <input list='radius' placeholder='Radius'/> */}
          <Select
            name="duration"
            //  value={formData.duration}
            //  onChange={handleChange}
            className={styles.muti}
            multiple
            defaultValue={["View type e.g video, virtual tour"]}
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
