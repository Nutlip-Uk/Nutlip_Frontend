import styles from '../../styles/Rent/RentFilter.module.css'
import { addedToSite, buyExclude, buyInclude, buyMusthaves, buyShowOnly, furnished, propertyType, rentExclude, rentMusthaves, rentShowOnly } from '../../utils/filters';
import { viewType } from '../../utils/view_type';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState } from 'react'




 const Home = () => {
    const [moreFilters, setMoreFilters] = useState(false)
    const [view, setView] = useState(false)
    const router = useRouter()
    const data = router.query
    const [area, setArea] = useState('')

    const [checkedState, setCheckedState] = useState(
        new Array(viewType.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }


    return (
        <div className={styles.inner_container}>

            <section>
                <div id={styles.search_area}>
                    <h4>Search area</h4>
                    <div>
                        <input type="text" placeholder="e.g. London or SW19" value={area} onChange={(e) => setArea(e.target.value)}/>
                        <Image src='/images/vuesax-linear-close-circle.svg' width={20} height={20} alt="icon" onClick={() => setArea('')}/>
                    </div>
                </div>

                <div id={styles.view_type}>
                    <h4>View type</h4>
                    {checkedState.every((e) => e === false ) && <span>Select</span>}
                    <div>
                        <div onClick={() => setView(!view)}>
                            {checkedState.map((item, index) => (
                                item === true ? <span key={index}>
                                    {viewType[index]}
                                </span> : null
                            ))}
                        </div>
                        <Image 
                         src='/images/vuesax-linear-close-circle.svg' 
                         width={20} 
                         height={20} 
                         alt="icon"
                         onClick={() => setCheckedState(new Array(viewType.length).fill(false))}
                        />
                    </div>
                    {view ? <div>
                        {viewType.map((item, index) => (
                            <label key={index}>
                                <input 
                                 type='checkbox'
                                 name={item}
                                 value={item}
                                 checked={checkedState[index]}
                                 onChange={() => handleOnChange(index)}
                                />
                                {item}
                            </label>
                        ))}
                    </div> : null}
                    
                </div>
            </section>

            <section>
                <div id={styles.search_radius}>
                    <h4>Search Radius</h4>
                    <select
                    name=""
                    >
                        <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>This area only</option>
                        <option value="" className='disabled'>This area only</option>
                    </select>
                </div>

                <div id={styles.bedroom}>
                    <h4>Bedroom</h4>
                    <div>
                        <select
                        name=""
                        >
                            <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>Min</option>
                            <option value="" className='disabled'>This area only</option>
                        </select>

                        <select
                        name=""
                        >
                            <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>Max</option>
                            <option value="" className='disabled'>This area only</option>
                        </select>
                    </div>
                </div>

                <div id={styles.price}>
                    <h4>Price range</h4>
                    <div>
                        <select
                        name=""
                        >
                            <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>Min</option>
                            <option value="" className='disabled'>This area only</option>
                        </select>

                        <select
                        name=""
                        >
                            <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>Max</option>
                            <option value="" className='disabled'>This area only</option>
                        </select>
                    </div>
                </div>

                <section className={styles.two_column}>
                   <h4> Property Type</h4>
                    <div>
                       {propertyType.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                       ))}
                    </div>
                </section>

            </section>

            { moreFilters ? <section>

                {router.pathname === '/rent' && <section>
                    <div className={styles.two_column}>
                        <h4>Furnished type</h4>
                        <div>
                            {furnished.map((item, index) => (
                                <label key={index}>
                                    <input type='radio'/>
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>
                </section>}

                <section className={styles.one_column}>
                    <h4>Show only</h4>

                    {router.pathname === '/rent' && <div>{rentShowOnly.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                    ))}</div>}

                    {router.pathname === '/buy' && <div>{buyShowOnly.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                    ))}</div>}
                </section>

                {router.pathname === '/buy' && <div className={styles.one_column}>
                    <h4>Include</h4>
                    {buyInclude.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                    ))}
                </div>}

                <section className={router.pathname === '/rent' ? styles.one_column : styles.two_column}>
                    <h4>Exclude</h4>

                    {router.pathname === '/rent' && <div>{rentExclude.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                    ))}</div>}

                    {router.pathname === '/buy' && <div>{buyExclude.map((item, index) => (
                        <label key={index}>
                            <input type='checkbox'/>
                            {item}
                        </label>
                    ))}</div>}
                </section>

                

                <section className={styles.two_column}>
                    <h4>Added to site</h4>
                    <div>
                        {addedToSite.map((item, index) => (
                            <label key={index}>
                                <input type='radio'/>
                                {item}
                            </label>
                        ))}
                    </div>
                </section>

                <div className={styles.two_column}>
                    <h4>Must haves</h4>

                    {router.pathname ==='/rent' && <div>
                        {rentMusthaves.map((item, index) => (
                            <label key={index} >
                                <input type='checkbox'/>
                                {item}
                            </label>
                        ))}
                    </div> }

                    {router.pathname ==='/buy' && <div>
                        {buyMusthaves.map((item, index) => (
                            <label key={index} >
                                <input type='checkbox'/>
                                {item}
                            </label>
                        ))}
                    </div> }
                </div>
            </section> : null }

            { !moreFilters ? <button onClick={() => setMoreFilters(!moreFilters)}>More filters</button> : <button onClick={() => setMoreFilters(!moreFilters)}>Less filters</button> }

            

            
            <div className={styles.btns}>
                <button>Clear all</button>
                <button 
                 id={styles.filter} 
                 onClick={() => router.push(`/${router.pathname}/search`)}
                >
                    {/* <Image src="search_icon.svg" width={20} height={20} alt="filter-icon"/> */}
                    Search
                </button>
            </div>

            

        </div>
    )
}



export default Home