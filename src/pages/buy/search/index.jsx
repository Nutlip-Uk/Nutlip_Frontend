import Catalogue from "../../../components/Rent/Catalogue";
import FilterModal from "../../../components/buy/FilterModal";
import Search from "../../../components/buy/Search";
import SearchResult from "../../../components/buy/SearchResult";
import { useEffect, useState, useRef } from 'react';
import styles from "../../../styles/Rent/SearchResult.module.css"
import { BuyCatalogue } from "../../../components/buy/BuyCatalogue";
import { useBuyContext } from '../../../context/Buy.context'
import { Pagination } from "@mui/material";


export default function Buy() {

  const { filters, setFilters, properties, totalPages, totalCount, isLoading } = useBuyContext();
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

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };


  return (
    <main className={styles.main}>
      <div className={styles.mainCon}>
        {showModal ? <FilterModal handleShow={closeModal} /> : null}

        <div ref={navbarRef} className={styles.floating}>
          <Search handleShow={closeModal} />
        </div>
        <SearchResult totalCount={totalCount} isLoading={isLoading} />

        <BuyCatalogue properties={properties} isLoading={isLoading} />



        <div className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={filters.page}
            variant="outlined"
            color="primary"
            onChange={handlePageChange}
          />
        </div>


      </div>
    </main>
  )
}



