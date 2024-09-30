import styles from "../../styles/dashboard/account.module.css";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, useRef } from "react";
import { UserTypeContext } from "../../context/UserType.context";

const Account = () => {
  const router = useRouter();
  const data = router.query;

  const [type, setType] = useState("account");
  const handleChange = (newType) => {
    setType(newType);
  };

  const count = useRef(1);
  const [update, setUpdate] = useState(false);

  const next = () => {
    if (count.current <= 4) {
      count.current = count.current + 1;
      setUpdate(!update); // Trigger a re-render
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
      setUpdate(!update);
    }
  };

  return (
    <div className={styles.Section}>
      {type === "account" && <MainAccount handleChange={handleChange} />}
      {type === "profile" && (
        <Profile
          handleChange={handleChange}
          count={count}
          next={next}
          back={back}
        />
      )}
    </div>
  );
};

export default Account;

const MainAccount = ({ handleChange }) => {
  return (
    <>
      <div className={styles.NavContainer}>
        <h1 className={styles.Header}>Account</h1>

        <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeHolder="search property" />
        </div>
      </div>

      <div className={styles.TransactionsContainer}>
        <div className={styles.Box} onClick={() => handleChange("profile")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Profile</p>
          <p className={styles.BoxText}>
            Edit your profile and gain more visibility
          </p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Settings </p>
          <p className={styles.BoxText}>
            Make changes to your account settings
          </p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Support</p>
          <p className={styles.BoxText}>Contact support for any challenges</p>
        </div>
        <div className={styles.Box} onClick={() => handleChange("")}>
          <img src="/dashboard/transaction.svg" height={24} width={24} />
          <p className={styles.BoxHeader}>Notification </p>
          <p className={styles.BoxText}>Contact support for any challenges</p>
        </div>
      </div>
    </>
  );
};

const Profile = ({ handleChangeSection, next, back, count }) => {
  const { userInfo } = useContext(UserTypeContext); // Assuming userInfo is coming from context
  const [formData, setFormData] = useState({
    accountType: userInfo?.userType || "",
    companyName: userInfo?.BusinessName || "",
    street: "",
    locality: "",
    state: "",
    country: userInfo?.Country || "",

    phoneNumber: userInfo?.PhoneNumber || "",
    mobileNumber1: userInfo?.MobileNumber || "",
    mobileNumber2: "",
    whatsappNumber: "",
    email1: userInfo?.email || "",
    email2: "",
    website: userInfo?.website || "",
    aboutCompany: "",
    services: "",
    facebook: "",
    twitter: "",
    // Add more fields as necessary
  });

  // This function will handle input changes and update the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // This function will handle form submission (for sending data to the API)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    // You can add the logic for sending the data to the API here
  };

  return (
    <>
      {count.current === 1 && (
        <ProfileFormOne
          next={next}
          handleChangeSection={handleChangeSection}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {count.current === 2 && (
        <ProfileFormTwo
          next={next}
          back={back}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

const ProfileFormOne = ({ handleChangeSection, next, formData, handleChange, handleSubmit }) => {
  const { userInfo } = useContext(UserTypeContext)
  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={() => handleChange("account")} className={styles.Header}>
          {"< Profile"}
        </h1>

        <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeHolder="search property" />
        </div>
      </div>

      <form className={styles.AccountMainForm}>
        <div className={styles.AccountFormOne}>
          <div className={styles.accountType}>
            <p>Account type</p>

            <div className={styles.radioContainer}>
              <label>
                <input type="radio" name="accountType" value="propertySeeker" onChange={handleChange} />
                Property Seeker
              </label>
              <label>
                <input type="radio" name="accountType" value="privateSeller" onChange={handleChange} />
                Private Seller
              </label>
              <label>
                <input type="radio" name="accountType" value="realEstateAgent" onChange={handleChange} />
                Real Estate Agent
              </label>
              <label>
                <input type="radio" name="accountType" value="conveyancer" onChange={handleChange} />
                Conveyancer
              </label>
              <label>
                <input type="radio" name="accountType" value="mortgager" onChange={handleChange} />
                Mortgager
              </label>
            </div>
          </div>
          <hr />

          <div className={styles.accountStatus}>
            <p>Account Status</p>

            <div className={styles.getVerified}>
              <p>Not Verified</p>
              <p>Get Verified</p>
            </div>
          </div>
        </div>



        <div className={styles.AccountFormTwo}>
          <div className={styles.inputContainer}>
            <label>
              Name
              <input type="text" placeholder="Pamela Keane" value={userInfo.username} />
            </label>
            <label>
              Company name
              <input type="text" placeholder="company name" value={userInfo.BusinessName} />
            </label>
            <label>
              Street
              <input type="text" placeholder="street" name="street" value={formData.street} onChange={handleChange} />
            </label>
            <label>
              Locality
              <input type="text" placeholder="Locality" name="locality" value={formData.locality} onChange={handleChange} />
            </label>
            <label>
              State
              <input type="text" placeholder="state" value={userInfo.city} />
            </label>
            <label>
              Country
              <input type="text" placeholder="Country" value={userInfo.Country} disabled />
            </label>
            <label>
              Phone number
              <input type="text" placeholder="+41" value={userInfo.PhoneNumber} disabled />
            </label>
            <label>
              Mobile number 1
              <input type="text" placeholder="Mobile" value={userInfo.MobileNumber} disabled />
            </label>
            <label>
              Mobile number 2
              <input type="text" placeholder="Mobile" name="mobileNumber2" value={formData.mobileNumber2} onChange={handleChange} />
            </label>
            <label>
              Whatsapp number
              <input type="text" placeholder="+41" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
            </label>
            <label>
              Email address 1
              <input type="text" placeholder="Email" value={userInfo.email} disabled />
            </label>
            <label>
              Email address 2
              <input type="text" placeholder="Email" name="email2" value={formData.email2} onChange={handleChange} />
            </label>

          </div>
          <div className={styles.disable}>
            <input type="checkbox" />
            <p>Disable client enquiries via email</p>
          </div>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};
const ProfileFormTwo = ({ back, next, formData, handleChange, handleSubmit }) => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);
  const [files, setFiles] = useState([]);
  const { userInfo } = useContext(UserTypeContext)

  const addImageField = () => {
    const newId = imageFields.length + 1;
    setImageFields([...imageFields, { id: newId }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFiles([...files, file]);
    addImageField();
  };

  return (
    <>
      <div className={styles.NavContainer}>
        <h1 onClick={back} className={styles.Header}>
          {"<"}
        </h1>

        {/* <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeHolder="search property" />
        </div> */}
      </div>

      <form className={styles.AccountMainForm}>
        <div className={styles.AccountSecondFormOne}>
          <div className={styles.WebsiteForm}>
            <label>
              Website
              <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
            </label>


          </div>
          <div>
            <div className={styles.CompanyLogo}>
              <p>Company logo</p>

              <div className={styles.inputField}>
                {imageFields.map((field, index) => (
                  <div key={field.id} id={styles.file_upload}>
                    <label>
                      {!files[index] && `Upload Document`}
                      <input type="file" onChange={handleImageChange} />

                      {files[index] && (
                        <img
                          src={URL.createObjectURL(files[index])}
                          width={210}
                          height={200}
                          alt={`Image ${index + 1}`}
                        />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
        <div className={styles.AccountSecondFormTwo}>
          <label>
            About your company
            <textarea name="aboutCompany" placeholder="Information about the company" value={formData.aboutCompany} onChange={handleChange} />
          </label>
          <label>
            Your services
            <textarea placeholder="What are your company services" value={formData.services} onChange={handleChange} />
          </label>

          <div className={styles.WebsiteForm}>
            <label>
              Facebook
              <input type="text" placeholder="link" name="facebook" value={formData.facebook} onChange={handleChange} />
            </label>

            <label>
              Twitter
              <input type="text" placeholder="link" name="twitter" value={formData.twitter} onChange={handleChange} />
            </label>
          </div>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button>Cancel</button>
        <button onClick={handleSubmit} >Save </button>
      </div>
    </>
  );
};
