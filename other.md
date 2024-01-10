<!-- from hero section -->

{/* <label>
                        Location
                        <input 
                         list='locations'
                        //  id='locations' 
                         name='locations' 
                         value={location} 
                         onChange={(e) => setLocation(e.target.value)}
                         placeholder='Select your city'
                        />
                        <datalist id='locations'>
                            <option value='whales' />
                            <option value='birmingham' />
                        </datalist>
                    </label>
                    <hr/>
                    <label>
                        Property Type
                        <input 
                         list='property type'
                        //  id='locations' 
                         name='property type' 
                         value={propertyType} 
                         onChange={(e) => setPropertyType(e.target.value)}
                         placeholder='Select property type'
                        />
                        <datalist id='property type'>
                            <option value='Condo' />
                            <option value='Apartment' />
                        </datalist>
                    </label>
                    <hr/>
                    <label>
                        Price Range
                        <input 
                         list='price range'
                        //  id='locations' 
                         name='price range' 
                         value={priceRange} 
                         onChange={(e) => setPriceRange(e.target.value)}
                         placeholder='Select rent range'
                        />
                        <datalist id='price range'>
                            <option value='whales' />
                            <option value='birmingham' />
                        </datalist>
                    </label>
                    <hr/>
                    <button className={styles.btn}>
                        <Image src='/search_icon.svg' width={20} height={20} alt={''} />
                        Search
                    </button> */}


<!-- from hero section -->









/* MOBILE */



.nav {
    display: flex;
    /* width: 100%; */
    height: 94px;
    
    padding: 3% 3%;
    font-family: 'Poppins';
    height: 40px;
    justify-content: space-between;
    /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
    background: #FFFFFF;
    position: sticky;
    z-index: 2;
    top: 0;

    align-items: center;
    flex-shrink: 0;
}

.nav > div {
    display: flex;
    width: 10%;
    justify-content: flex-end;
}

.reg > a {
    width: 30%;
    display: flex;
    /* justify-content: center; */
}




.nav img:first-of-type {
    width: 60%;
    
    height: 53px;
}

.reg img:first-of-type {
    width: 60%;
    
    height: 33px;
}

.reg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* background: #DA0025; */
    height: 54px;
    
    padding: 1% 1%;
}

.load {
    transform: rotate(90deg);
    transition: .5s ease;
}

.unload {
    transform: rotate(0deg);
    transition: .5s ease;
}

.img *{
    /* width: 100px; */
    /* height: 100px; */
    /* position: relative; */
}


.links{
    width: 72%;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    align-self: stretch;

    z-index: 1;

    background: #FFFFFF;
    top: 58px;
    left: 28%;
    height: auto;
    position: absolute;
}

.links.active{
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition: 0.5s ease;
}

.links.inactive{
    opacity: 0;
    visibility: hidden;
    transform: translateX(1000px);
    transition: 0.5s ease;
}

.links > a{
    text-decoration: none;
    color: #000000;
}

.links a:first-child{
    padding-top: 24px;
}

.links > a{
    display: flex;
    padding: 12px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* width: 20%; */
    align-self: stretch;
    border-bottom: 0.5px solid #B1A7A7;
    align-self: stretch;
}

.links div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding-bottom: 24px;
}



.btn {
    color: #E3EBFE;
    box-sizing: border-box;
    font-weight: bold;

    text-decoration: none;


    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 13px; */

    width: 232px;
    height: 51px;

    background: #DA0025;
    border-radius: 8px;
    border: none;
}

.btn_white {
    color: #000000;
    box-sizing: border-box;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    

    width: 232px;
    height: 51px;

    background: none;
    border-radius: 8px;
    border: 1.8px solid #000000;
}

.btn_white:hover {
    color: #FFFFFF;
    background-color: #DA0025;
    border: none;
}







/* TAB */

@media (width <= 400px) {}@media (400px <= width <= 779px)  {

    .nav {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 30px;
    }

    .links {
        width: 50%;
        left: 50%;
    }
}



/* WEB */
@media (780px <= width <= 960px) {
    .nav {
        display: flex;
        
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 96%;
        height: 50px;
        
        padding: 1% 2%;
    }

    .nav > div {
        width: 68%;
        justify-content: center;
    }


    .img {
        display: none;
    }

    

    .nav img:first-of-type{
        width: 20%;
        height: 29.266px;
        
        position: inherit;
    }

    .links {
        display: flex;
        flex-direction: row;
        position: inherit;
        justify-content: space-evenly;
        align-items: center;
        gap: 10%;
        /* font-size: 13px; */
        width: 55%;

        background-color: transparent;
    }

    .links.inactive{
        transform: none;
        opacity: 1;
        visibility: visible;
    }

    .links > a{
        border-bottom: none;
        width: 12%;
        padding: 0 10px;
    }

    .links a:first-of-type{
        padding: 0;
    }

    .links > a:last-of-type {
        /* width: 13%; */
    }

    .links > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 220px;
        gap: 13px;
        padding: 0;
    }


    .btn {
        padding: 10px 20px;
        width: 120px;
        height: 45px;
    }

    .btn_white {
        padding: 10px 20px;
        width: 120px;
        height: 45px;
    }
}