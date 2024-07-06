
import styles from "../../../styles/sell/postyourhome.module.css";
import PostImage from "../../../../public/sell/postyourhome.png";
import { router } from "next/router";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Image  from 'next/image';
const PostYourHome = () => {
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
        <Benefits/>
      </section>
    </>
  );
};

export default PostYourHome;

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
            Street Address
         <input
            type="text"
            placeholder="Address"
          />
         </label>
          
          <label>
            City
          <input
            type="text"
            placeholder="e.g London"
          />
          </label>

          <label>
            Postal Code
          <input
            type="text"
            placeholder="Postal Code"
          />
          </label>
          
          </div>

        <div className={styles.SelectContainer}>
          <label>Country</label>
          <Select
            name="country"
            className={styles.muti}
            defaultValue={["Select Country"]}
          >
            <Option value="United States">United States</Option>
            <Option value="China">China</Option>
            <Option value="Japan">Japan</Option>
            <Option value="Germany">Germany</Option>
            <Option value="United Kingdom">United Kingdom</Option>
            <Option value="France">France</Option>
            <Option value="India">India</Option>
            <Option value="Italy">Italy</Option>
            <Option value="Brazil">Brazil</Option>
            <Option value="Canada">Canada</Option>
            <Option value="Russia">Russia</Option>
            <Option value="South Korea">South Korea</Option>
            <Option value="Australia">Australia</Option>
            <Option value="Spain">Spain</Option>
            <Option value="Mexico">Mexico</Option>
          </Select>
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
            src="/sell/4xfaster.png"
            width={643}
            height={400}
            alt="image"
          />
        </div>
       
        <article className={styles.TextContainer}>
          <h3>{"Ready to start selling your home?"}</h3>
          <p>
         {" By choosing our platform, you not only gain control over the presentation of your property but also access a range of tools to make your listing stand out. Embrace the freedom to tailor your home's narrative and features, making it irresistible to potential buyers. "}
          </p>
        </article>
      </div>
    </div>
  );
}


const Benefits =()=>{
    return(
        <>
        <div className={styles.SellHomeSection}>
            <div className={styles.BenefitsContainer}>
                <div className={styles.BenefitList}>
                    <p className={styles.BenefitNumber}>1</p>
                    <p className={styles.BenefitHeader}>{"Cost-Effective Solutions"}</p>
                    <p className={styles.BenefitText}>{"Save money by bypassing the traditional real estate agent fees"}</p>
                </div>
                <div className={styles.BenefitList}>
                    <p className={styles.BenefitNumber}>2</p>
                    <p className={styles.BenefitHeader}>{"Simple and User-Friendly"}</p>
                    <p className={styles.BenefitText}>{"Our user-friendly interface makes the process of posting a home for sale by owner a breeze"}</p>
                </div>
                <div className={styles.BenefitList}>
                    <p className={styles.BenefitNumber}>3</p>
                    <p className={styles.BenefitHeader}>Maximum Exposure</p>
                    <p className={styles.BenefitText}>{"Reach a vast audience of potential buyers with our extensive marketing reach."}</p>
                </div>
            </div>
         </div>

        </>
    )
}