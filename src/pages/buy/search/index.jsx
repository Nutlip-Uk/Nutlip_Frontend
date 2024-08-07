import Catalogue from "../../../components/Rent/Catalogue";
import FilterModal from "../../../components/buy/FilterModal";
import Search from "../../../components/buy/Search";
import SearchResult from "../../../components/buy/SearchResult";
import { useEffect, useState, useRef } from 'react';
import styles from "../../../styles/Rent/SearchResult.module.css"
import { BuyCatalogue } from "../../../components/buy/BuyCatalogue";
import { useBuyContext } from '../../../context/Buy.context'

export default function Buy() {

  const { properties, setProperties } = useBuyContext();

  // const [properties, setProperties] = useState([]);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const response = await fetch('https://nutlip-backend.onrender.com/api/apartments/getallapartments');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProperties(data.data);
  //         console.log(data.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching properties:', error);
  //     }
  //   };

  //   fetchProperties();
  // }, []);


  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(!showModal)

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (navbarRef.current) {
        if (prevScrollPos > currentScrollPos) {
          navbarRef.current.style.top = "0";
        } else {
          navbarRef.current.style.top = "-1000px";
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, navbarRef]);


  return (
    <main className={styles.main}>
      <div className={styles.mainCon}>
        {showModal ? <FilterModal handleShow={closeModal} /> : null}

        <div ref={navbarRef} className={styles.floating}>
          <Search handleShow={closeModal} />
        </div>
        <SearchResult />

        <BuyCatalogue properties={properties} />
      </div>
    </main>
  )
}

