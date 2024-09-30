import styles from "../../styles/Rent/RentFilter.module.css";
import {
  rentExclude,
  buyExclude,
  propertyType,
  furnished,
  addedToSite,
  rentMusthaves,
  buyMusthaves,
  rentShowOnly,
  buyShowOnly,
  buyInclude,
} from "../../utils/filters";
import { viewType } from "../../utils/view_type";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const FilterModal = (props) => {
  const router = useRouter();
  const [view, setView] = useState(false);

  // console.log(router.pathname)

  const [checkedState, setCheckedState] = useState(
    new Array(viewType.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <section className={styles.Section}>
      <form className={styles.container}>
        <div className={styles.inner_container}>
          <section className={styles.header}>
            {/* <h2>Filter your result</h2> */}
            <button onClick={() => props.handleShow()}>
              <Image
                src="/images/vector-close.svg"
                width={15}
                height={15}
                alt="thumbnail"
              />
            </button>
          </section>

          {/* <section id={styles.view_type}>
        <h4>View type</h4>
        <div>
            <div onClick={() => setView(!view)}>
                {checkedState.every((e) => e === false ) && <label>Select</label>}
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
        
        
    </section> */}

          {/*  <section id={styles.search_radius}>
        <label>Search Radius</label>
        <select
        name=""
        >
            <option value="" className='disabled' defaultValue={'This area only'} disabled  selected>This area only</option>
            <option value="" className='disabled'>This area only</option>
        </select>
    </section> */}

          {/* <section id={styles.bedroom}>
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
    </section> */}

          <section className={styles.rowOne}>
          
            <section className={styles.Price}>
              <h4>Bedroom</h4>
              <div className={styles.PriceSelectContainer}>
                <select name="">
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"Min"}
                    
                    selected
                  >
                    Min
                  </option>
                  
                </select>

                <select name="">
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"Max"}
                    disabled
                    selected
                  >
                    Max
                  </option>
                 
                </select>
              </div>
            </section>


            <section className={styles.Price}>
              <h4>Price range</h4>
              <div className={styles.PriceSelectContainer}>
                <select name="">
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"Min"}
                    
                    selected
                  >
                    Min
                  </option>
                  
                </select>

                <select name="">
                  <option
                    value=""
                    className="disabled"
                    defaultValue={"Max"}
                    disabled
                    selected
                  >
                    Max
                  </option>
                 
                </select>
              </div>
            </section>

            {router.pathname === "/buy/search" && (
              <div className={styles.Include}>
                <h4>Include</h4>
                <div className={styles.one_column} >
                {buyInclude.map((item, index) => (
                  <div className={styles.includeCon} key={index}>
                      <label>
                      <input type="checkbox" />
                      {item}
                    </label>
                  </div>
                ))}
                </div>
              </div>
            )}

            <section
              className={
                router.pathname === "/rent/search"
                  ? styles.Exclude
                  : styles.Exclude
              }
            >
              <h4>Dont show</h4>

              {router.pathname === "/rent/search" && (
                <div className={styles.one_column}>
                  {rentExclude.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}

              {router.pathname === "/buy/search" && (
                <div className={styles.two_column}>
                  {buyExclude.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}
            </section>
            <section
              className={
                router.pathname === "/rent/search"
                  ? styles.Exclude
                  : styles.Exclude
              }
            >
              <h4>Show only</h4>

              {router.pathname === "/rent/search" && (
                <div className={styles.one_column}>
                  {rentExclude.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}

             
            </section>
          </section>

          <hr />
          <section className={styles.rowTwo}>
            <section className={styles.propertyType}>
              <h4> Property Type</h4>
              <div className={styles.two_column}>
                {propertyType.map((item, index) => (
                  <label key={index}>
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </section>

            {/* {router.pathname === "/rent/search" && (
              <section className={styles.propertyType}>
                
                  <h4>Furnished type</h4>
                  <div  className={styles.two_column}>
                    {furnished.map((item, index) => (
                      <label key={index}>
                        <input type="radio" />
                        {item}
                      </label>
                    ))}
                  </div>
                
              </section>
            )} */}

            {/*  {router.pathname === '/rent/search' && <hr/>} */}

           {/*  <section >
              <h4>Show only</h4>

              {router.pathname === "/rent/search" && (
                <div className={styles.one_column}>
                  {rentShowOnly.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}

              {router.pathname === "/buy/search" && (
                <div>
                  {buyShowOnly.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}
            </section> */}

           

            <div  className={styles.MustHaves}>
              <h4>Must haves</h4>

              {router.pathname === "/rent/search" && (
                <div className={styles.two_column}>
                  {rentMusthaves.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}

              {router.pathname === "/buy/search" && (
                <div className={styles.two_column}>
                  {buyMusthaves.map((item, index) => (
                    <label key={index}>
                      <input type="checkbox" />
                      {item}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <section className={styles.AddedToSite}>
              <h4>Added to site</h4>
              <div className={styles.two_column}>
                {addedToSite.map((item, index) => (
                  <label key={index}>
                    <input type="radio" />
                    {item}
                  </label>
                ))}
              </div>
            </section>
          </section>

          <section className={styles.btns}>
            <button>Clear all</button>
            <button>Apply</button>
          </section>
        </div>
      </form>
    </section>
  );
};

export default FilterModal;
