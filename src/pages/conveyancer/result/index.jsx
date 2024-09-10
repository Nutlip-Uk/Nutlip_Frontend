import styles from "../../../styles/Mortgage/Result.module.css";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { useEffect, useState } from "react";
import CopyButton from "../../../components/CopyButton";
export default function Result() {

  const [conveyancer, setConveyancer] = useState([])

  useEffect(() => {

    const handleGetConveyancer = async () => {

      const response = await fetch('https://nutlip-backend-yhfz.onrender.com/api/conveyancer/getallconveyancer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      console.log(data.data)
      setConveyancer(data.data)
    }

    handleGetConveyancer();
  }, [])

  return (
    <div className={styles.Section}>
      <div className={styles.Container}>
        <div className={styles.FormContainer}>
          <FormComponent />
        </div>
        <section className={styles.section}>
          {
            conveyancer.map((item, index) => {
              return (
                <ResultInfo key={item?._id} item={item} />
              )
            })
          }
        </section>
      </div>
    </div>
  );
}

const FormComponent = () => {
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Postcode, City, Location" />
        </div>

        <div className={styles.SelectContainer}>
          {/* <input list='radius' placeholder='Radius'/> */}
          <Select
            name="duration"
            //  value={formData.duration}
            //  onChange={handleChange}
            className={styles.muti}
            multiple
            defaultValue={["View type e.g video, virtual tour"]}
            placeholder="Radius"
          >
            <Option value="Picture">Picture</Option>
            <Option value="Video">Video</Option>
            <Option value="Virtual Tour">Virtual Tour</Option>

            {/* <option value="" className='disabled'>This area only</option> */}
          </Select>
        </div>

        <a
          /* onClick={() => router.push(`/mortgages/result`)} */
          id="search"
          className={styles.searchButton}
        >
          <img src="/mortgages/search.svg" alt="" />
          <p>Search</p>
        </a>
      </form>
    </>
  );
};

const ResultInfo = ({ item }) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.infoDiv}>
        {/* <img
          className={styles.image}
          src="https://via.placeholder.com/188x73"
        /> */}


        <div className="flex items-center gap-2 py-3 w-54">
          <p className="text-xl font-semibold ">{item?.username}</p>
          <CopyButton textToCopy={item?._id} />
        </div>
        <div className={styles.moreInfoDiv}>
          <div className={styles.moreInfoText}>More info</div>
        </div>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.feeDiv}>
        <p className={styles.feeAmount}>£1,307</p>
        <p className={styles.feeType}>Flat fee</p>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.locationDiv}>
        <div className={styles.locationInfo}>
          <img src="/mortgages/location.svg" alt="" />
          <p className={styles.locationText}>{item?.Address1}</p>
        </div>

        <p className={styles.priceDetailsText}>Price details</p>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.actionsDiv}>
        <div className={styles.actionButton}>
          <a href={`tel:${item?.PhoneNumber}`}>
            <img src="/mortgages/phone.svg" alt="Call us" />
          </a>
        </div>
        <div className={styles.actionButton}>
          <img src="/mortgages/whatsapp.svg" alt="" />
        </div>
        <div className={styles.actionButton}>
          <a href={`mailto:${item?.email}`}>
            <img src="/mortgages/sms.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};
