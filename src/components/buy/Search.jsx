import styles from "../../styles/Rent/Search.module.css";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { useBuyContext } from "../../context/Buy.context";

const Search = (props) => {
  const { filters, setFilters } = useBuyContext();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        <section className={styles.criteria_one}>


          <div className={styles.criteriaOneInputCon}>
            <input type="text" placeholder="e.g. London or SW19" />
            <Image
              src="/images/vuesax-linear-close-circle.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </div>


          <div className={styles.buttonContainer}>
            <button className={styles.search}>Search</button>
            <button
              className={styles.filterBtn}
              onClick={() => props.handleShow()}
            >
              <Image
                src="/images/vuesax-linear-setting-4.svg"
                width={20}
                height={30}
                alt="filter-icon"
              />
            </button>
          </div>
        </section>

        <section className={styles.criteria_two}>
          <div className={styles.criteria_twoCon}>
            <label>
              Search Area
              <div>
                <input
                  className={styles.Areainput}
                  type="text"
                  placeholder="Location"
                />
              </div>
            </label>

            <label>
              View Type
              <select name="" className={styles.viewType}>
                <option
                  value=""
                  className="disabled"
                  defaultValue={"pictures,etc"}
                  disabled
                  selected
                >
                  pictures,etc
                </option>
                <option value="" className="disabled">
                  pictures,etc
                </option>
              </select>
            </label>

            <label>
              Bedroom
              <div className={styles.Bed}>
                <select name="" className={styles.BedMinMax}>
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"This area only"}
                    disabled
                    selected
                  >
                    Min
                  </option>
                  <option value="" className="disabled">
                    This area only
                  </option>
                </select>

                <select name="" className={styles.BedMinMax}>
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"This area only"}
                    disabled
                    selected
                  >
                    Max
                  </option>
                  <option value="" className="disabled">
                    This area only
                  </option>
                </select>
              </div>
            </label>

            <label>
              Price range
              <div className={styles.priceRange}>
                <select name="" className={styles.priceMinMax}>
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"This area only"}
                    disabled
                    selected
                  >
                    Min
                  </option>
                  <option value="" className="disabled">
                    This area only
                  </option>
                </select>

                <select name="" className={styles.priceMinMax}>
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"This area only"}
                    disabled
                    selected
                  >
                    Max
                  </option>
                  <option value="" className="disabled">
                    This area only
                  </option>
                </select>
              </div>
            </label>

            <div className={styles.buttonContainer}>
              <button
                className={styles.filterBtn}
                onClick={() => props.handleShow()}
              >
                <Image
                  src="/images/vuesax-linear-setting-4.svg"
                  width={20}
                  height={30}
                  alt="filter-icon"
                />
                <p>Filter</p>
              </button>
              <button className={styles.search}>
                <p>Search</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

// const PropertyType

export default Search;
