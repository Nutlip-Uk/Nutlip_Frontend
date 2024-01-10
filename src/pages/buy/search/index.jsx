import Catalogue from "../../../components/Rent/Catalogue";
import FilterModal from "../../../components/Rent/FilterModal";
import Search from "../../../components/Rent/Search";
import SearchResult from "../../../components/Rent/SearchResult";
import { buy } from "../../../utils/buyproperties";
import { useEffect, useState, useRef } from 'react';
import styles from "../../../styles/Rent/SearchResult.module.css"
import { BuyCatalogue } from "../../../components/buy/BuyCatalogue";


export default function Rent() {
  const [input, setInput] = useState(buy)
  const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(!showModal)
    }

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const navbarRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
  
        if (prevScrollPos > currentScrollPos) {
          navbarRef.current.style.top = "0";
        } else {
          navbarRef.current.style.top = "-1000px";
        }
  
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Clean up function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevScrollPos]); // Empty array ensures that effect is only run on mount and unmount
  

  return (
    <main className={styles.main}>
     <div className={styles.mainCon}>
      {showModal ? <FilterModal handleShow={closeModal}/> : null}
        
          <div ref={navbarRef} className={styles.floating}>
          <Search handleShow={closeModal}/>
          </div>
        <SearchResult/>
        
      <BuyCatalogue/>
     </div>
    </main>
  )
}

