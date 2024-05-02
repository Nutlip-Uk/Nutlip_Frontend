
import styles from "../../../styles/sell/Traditionally.module.css";
import PostImage from "../../../../public/sell/postyourhome.png";
import { router } from "next/router";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Image  from 'next/image';

function SellTraditionallyPage() {
  return (
    <>
      <section className={styles.Section}>
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${PostImage})` }}
        >
          <div className={styles.HeroCompContainer}>
            <HeroComponent />
          </div>
        </div>
        <SellHome/>
        
      </section>
    </>
  );
}

export default SellTraditionallyPage;


const HeroComponent = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/sell/postyourhome/propertylocation")
  };

  
      
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
         <label>
            Full Name
         <input
            type="text"
            placeholder="Full Name"
          />
         </label>
          
          <label>
            Address
          <input
            type="text"
            placeholder="Address"
          />
          </label>

          <label>
            Email Address
          <input
            type="text"
            placeholder="Email Address"
          />
          </label>

          <label>
          Phone number
          <input
            type="text"
            placeholder="Phone number"
          />
          </label>
            

          <div className={styles.radioGroup}>
          <div className={styles.radioButtonContainer}>

<input type="radio"
id="privateSeller"
name="description"
  value="Yes"
  
  label="Yes"
/>

<label for="Yes">Yes</label>

</div>

<div className={styles.radioButtonContainer}>

<input type="radio"
name="description"
  value="No"
  
  label="No"
/>
<label for="No">No</label>
</div>

          </div>

          </div>

        




       
       <button
          
          id="search"
          className={styles.searchButton}
          onClick={handleSubmit}
        >
          Continue
        </button>
        
       
      </form>
    </>
  );
};



const SellHome=()=> {
  return (
    <div className={styles.SellHomeSection}>
      <div className={styles.SellHomeContainer}>
      <div className={styles.SellHomeImgContainer}>
          <Image
            src="/sell/traditionally.png"
            width={643}
            height={400}
            alt="image"
          />
        </div>
       
        <article className={styles.TextContainer}>
          <h3>Sell your home using one of our highly rated estate agents</h3>
          <p>
          With our experienced estate agents by your side, selling your home becomes a breeze, delivering peace of mind with outstanding results backed by years of industry and market knowledge. 
          </p>
        </article>
      </div>
    </div>
  );
}
