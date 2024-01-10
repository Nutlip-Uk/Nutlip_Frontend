import Home from "../../components/Rent/Index";
import styles from '../../styles/Mortgage/Home.module.css'

import { router } from "next/router";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import FindBroker from "../../components/mortgages/FindBroker";
import HowToFind from "../../components/mortgages/HowToFind";


const Mortgage = (props) => {
  return (
    <>
      <section className={styles.Section}>
        <div
          className={styles.container}
          
        >
          <div className={styles.HeroCompContainer}>
            <HeroComponent />
          </div>

        </div>

        <FindBroker/>
        <HowToFind/>

      </section>
    </>
  );
};

export default Mortgage;

const HeroComponent = () => {
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Postcode, City, Location"
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
            placeholder="Radius"
          >
            <Option value="Picture">Picture</Option>
            <Option value="Video">Video</Option>
            <Option value="Virtual Tour">Virtual Tour</Option>

            {/* <option value="" className='disabled'>This area only</option> */}
          </Select>
        </div>

        <a
          
          onClick={() => router.push(`/mortgages/result`)}
          id="search"
          className={styles.searchButton}
        >
          Search
        </a>
      </form>
    </>
  );
};
