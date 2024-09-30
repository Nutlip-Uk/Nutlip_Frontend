import styles from "../../styles/dashboard/favourites.module.css";
const Favourites = () => {
  return (
    <div className={styles.Section}>
    <div className={styles.NavContainer}>
      <h1 className={styles.Header}>Favourites</h1>

      <div className={styles.search}>
        <img src="/navbar/search.svg" />
        <input type="text" placeHolder="search property" />
      </div>
    </div>


    <div className={styles.favouritesContainer}>
      <p className={styles.favouritesResult}>Result 0-0 of 0</p>

      <div className={styles.favourites}>
        <p>You don’t have any favourite or property saved</p>
      </div>
    </div>
  </div>
  )
}

export default Favourites
