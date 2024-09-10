import Image from "next/image"
import styles from "../../styles/Rent/SearchResult.module.css"
import Skeleton from '@mui/joy/Skeleton';



const SearchResult = ({ totalCount, isLoading }) => {
    return (
        <div className={styles.container}>
            <ResultHeader totalCount={totalCount} isLoading={isLoading} />
        </div>
    )
}


const ResultHeader = ({ totalCount, isLoading }) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoCon}>
                <div className={styles.resultNum}>
                    <Skeleton className="relative w-auto" loading={isLoading} height={"100%"}>
                        <p>{totalCount} results</p>
                    </Skeleton>

                </div>
                <div className={styles.mapView}>
                    <Image src="/images/vuesax-linear-location.svg" width={20} height={20} alt="map-icon" />
                    <p> Map view</p>
                </div>
                <label className={styles.sort}>
                    Sort
                    <select name="" className={styles.sortSelect}>
                        Most Recent
                        <option value="" className='disabled' defaultValue={'This area only'} disabled selected>Most recent</option>
                        <option value="" className='disabled'>This area only</option>
                    </select>
                </label>
            </div>

            <div className={styles.infoConTwo}>
                <button>
                    <Image src="/sms.svg" width={24} height={24} alt="email-icon" />
                    Email alert
                </button>

                <button>
                    <Image src="/hearts.svg" width={24} height={24} alt="heart-icon" />
                    Save search
                </button>
            </div>
        </div>
    )
}





export default SearchResult