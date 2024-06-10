import Catalogue from "../../../components/Rent/Catalogue";
import FilterModal from "../../../components/Rent/FilterModal";
import Search from "../../../components/Rent/Search";
import SearchResult from "../../../components/Rent/SearchResult";
import styles from "../../../styles/Rent/SearchResult.module.css"
import { rent } from "../../../utils/properties";
import { useEffect, useState, useRef } from 'react';




export default function Rent() {
  const [input, setInput] = useState(rent)
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/apartments'); 
        const data = await response.json();
        console.log("API Data", data)

        // Filter the properties based on the 'purpose' value
        const filteredProperties = data.filter(property => property.purpose === 'For_Rent');
        
        setProperties(filteredProperties);
        console.log("Filtered properties",filteredProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

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
       
     <Catalogue/>
    </div>
   </main>
  )
}