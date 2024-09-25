
import styles from "../../styles/Home/Hero.module.css";
import buy_rent from "../../styles/Home/Buy_Rent.module.css";
import mort_con from "../../styles/Home/Mortgage_Conveyancer.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion"
import HeroImage from "../../../public/heroimageTablet.png"
import Router, { useRouter } from "next/router";
const Hero = () => {
  const [searchType, setSearchType] = useState("Buy");

  // const searchOption = useRef()

  const [selected, setSelected] = useState(searchType);

  return (
    <div className={styles.container}>
      <img className={styles.ContainerImage} src="https://framerusercontent.com/images/EyhrF1KO3bHuC8YXkOUpp50.png" alt="" />
      <h1 className={styles.HeroText}>Faster . Cheaper . Easier</h1>
      <div className={styles.compCon}>
        <HeroComponent />
      </div>
    </div>
  );
};

const Buy = () => {
  const [location, setLocation] = useState("");

  return (
    <form className={buy_rent.form}>
      <div className={buy_rent.InputContainer}>
        <input
          type="text"
          placeholder="Where do you want to Buy? e.g. Liverpool or L11"
          id="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={buy_rent.checkboxContainer}>
        <label>
          <input type="checkbox" />
          Pictures
        </label>
        <label>
          <input type="checkbox" />
          Videos
        </label>
        <label>
          <input type="checkbox" />
          Virtual tour
        </label>
      </div>
      <Link
        href={
          "/buy/search"
        }
      >
        To Buy
      </Link>
    </form>
  );
};

const Rent = () => {
  const [location, setLocation] = useState("");
  const [displaytype, setDisplayType] = useState([]);
  const addType = (option) => {
    setDisplayType([...displaytype, option]);
  };

  const removeType = (option) => {
    setDisplayType([...displaytype.filter((t) => t !== displaytype)]);
  };

  return (
    <form className={buy_rent.form}>
      <div className={buy_rent.InputContainer}>
        <input
          type="text"
          placeholder="e.g Leeds or LS12"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={buy_rent.checkboxContainer}>
        <label>
          <input
            type="checkbox"
          //  {checked ? }
          />
          Pictures
        </label>
        <label>
          <input type="checkbox" />
          Videos
        </label>
        <label>
          <input type="checkbox" />
          Virtual tour
        </label>
      </div>
      <Link
        href={{
          pathname: "/rent",
          query: {
            location: location,
          },
        }}
      >
        To Rent
      </Link>
    </form>
  );
};

const Mortgages = () => {
  return (
    <div className={mort_con.container}>
      <div className={mort_con.inputContainer}>
        <input type="text" placeholder="Postcode, City, Town" />
      </div>

      <div className={mort_con.SelectContainer}>
        {/* <input list='radius' placeholder='Radius'/> */}
        <select
          name="duration"
          //  value={formData.duration}
          //  onChange={handleChange}
          className=""
        >
          <option
            value=""
            className="disabled"
            disabled
            selected
            defaultValue={"This area only"}
          >
            Radius
          </option>
          <option value="0.25 miles" className="disabled">
            0.25 miles
          </option>
          <option value="0.5 miles" className="disabled">
            0.5 miles
          </option>
          <option value="1 mile" className="disabled">
            1 mile
          </option>
          <option value="3 miles" className="disabled">
            3 miles
          </option>
          <option value="5 miles" className="disabled">
            5 miles
          </option>
          {/* <option value="" className='disabled'>This area only</option> */}
        </select>
      </div>

      <button
        onClick={() => router.push("/mortgages?type=broker+result")}
        id="search"
        className={mort_con.searchButton}
      >
        Search
      </button>
    </div>
  );
};

const Conveyancer = () => {

  const router = useRouter();

  return (
    <div className={mort_con.container}>
      <div className={mort_con.inputContainer}>
        <input type="text" placeholder="Postcode, City, Town" />
      </div>

      <div className={mort_con.SelectContainer}>
        {/* <input list='radius' placeholder='Radius'/> */}
        <select
          name="duration"
          //  value={formData.duration}
          //  onChange={handleChange}
          className=""
        >
          <option
            value=""
            className="disabled"
            disabled
            selected
            defaultValue={"This area only"}
          >
            Radius
          </option>
          <option value="0.25 miles" className="disabled">
            0.25 miles
          </option>
          <option value="0.5 miles" className="disabled">
            0.5 miles
          </option>
          <option value="1 mile" className="disabled">
            1 mile
          </option>
          <option value="3 miles" className="disabled">
            3 miles
          </option>
          <option value="5 miles" className="disabled">
            5 miles
          </option>
          {/* <option value="" className='disabled'>This area only</option> */}
        </select>
      </div>

      <button
        onClick={() => router.push("/mortgages?type=broker+result")}
        id="search"
        className={mort_con.searchButton}
      >
        Search
      </button>
    </div>
  );
};

const HeroComponent = () => {
  const [searchType, setSearchType] = useState("Buy");

  // const searchOption = useRef()

  const [selected, setSelected] = useState(searchType);
  return (
    <>
      <div className={styles.content}>
        <motion.div initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -30 },
          }} className={styles.search_type}>
          <label
            className={`${searchType === "Buy" ? styles.selected : styles.unselected
              }`}
          >
            Buy
            <input
              type="radio"
              id="buy"
              name="searchType"
              value="Buy"
              //  checked={searchType === 'Buy'}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </label>
          <label
            className={`${searchType === "Rent" ? styles.selected : styles.unselected
              }`}
          >
            Rent
            <input
              type="radio"
              id="rent"
              name="searchType"
              value="Rent"
              //  checked={searchType === 'Rent'}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </label>
          <label
            className={`${searchType === "Mortgages" ? styles.selected : styles.unselected
              }`}
          >
            Mortgages
            <input
              type="radio"
              id="mortgages"
              name="searchType"
              value="Mortgages"
              //  checked={searchType === 'Mortgages'}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </label>
          <label
            className={`${searchType === "Conveyancer" ? styles.selected : styles.unselected
              }`}
          >
            Conveyancer
            <input
              type="radio"
              id="conveyancer"
              name="searchType"
              value="Conveyancer"
              //  checked={searchType === 'Conveyancer'}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </label>
        </motion.div>

        <motion.div initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }} className={styles.search_options}>
          {searchType === "Buy" ? <Buy /> : null}
          {searchType === "Rent" ? <Rent /> : null}
          {searchType === "Mortgages" ? <Mortgages /> : null}
          {searchType === "Conveyancer" ? <Conveyancer /> : null}
        </motion.div>
      </div>
    </>
  );
};

export default Hero;