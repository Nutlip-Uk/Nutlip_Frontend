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
            <input
              type="text"
              name="location"
              placeholder="e.g. London or SW19"
              value={filters.location}
              onChange={handleOnChange}
            />
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
                  name="location" 
                  placeholder="Location"
                  value={filters.location}
                  onChange={handleOnChange} 
                />
              </div>
            </label>

            <label>
              View Type
              <select
                name="viewType" 
                className={styles.viewType}
                value={filters.viewType} 
                onChange={handleOnChange}
              >
                <option value="images">Images</option>
                <option value="videos">Videos</option>
                <option value="virtual tour">Virtual Tour</option>
              </select>
            </label>

            <label>
              Bedroom
              <div className={styles.Bed}>
                <select
                  name="minBedRoom" // Added name attribute
                  className={styles.BedMinMax}
                  value={filters.minBedRoom} // Controlled select
                  onChange={handleOnChange} // Update filters on change
                >
                  <option value={0}>Min</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>

                <select
                  name="maxBedRoom" 
                  className={styles.BedMinMax}
                  value={filters.maxBedRoom} 
                  onChange={handleOnChange} 
                >
                  <option value={0}>Max</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </label>

            <label>
              Price range
              <div className={styles.priceRange}>
                <select
                  name="minPrice" // Added name attribute
                  className={styles.priceMinMax}
                  value={filters.minPrice} // Controlled select
                  onChange={handleOnChange} // Update filters on change
                >
                  <option value={0}>Min</option>
                  <option value={10000}>$10,000</option>
                  <option value={50000}>$50,000</option>
                  <option value={100000}>$100,000</option>
                  <option value={500000}>$500,000</option>
                </select>

                <select
                  name="maxPrice" // Added name attribute
                  className={styles.priceMinMax}
                  value={filters.maxPrice} // Controlled select
                  onChange={handleOnChange} // Update filters on change
                >
                  <option value={0}>Max</option>
                  <option value={100000}>$100,000</option>
                  <option value={500000}>$500,000</option>
                  <option value={1000000}>$1,000,000</option>
                  <option value={5000000}>$5,000,000</option>
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
