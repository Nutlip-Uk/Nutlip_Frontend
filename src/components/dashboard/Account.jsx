import styles from "../../styles/dashboard/account.module.css";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, useRef } from "react";

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

const Profile = ({ handleChange, next, back, count }) => {
  return (
    <>
      {count.current === 1 && (
        <ProfileFormOne next={next} handleChange={handleChange} />
      )}
      {count.current === 2 && (
        <ProfileFormTwo next={next} back={back} handleChange={handleChange} />
      )}
    </>
  );
};

const ProfileFormOne = ({ handleChange, next }) => {
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
                <input type="radio" placeholder="" />
                Property Seeker
              </label>
              <label>
                <input type="radio" placeholder="" />
                Property Owner
              </label>
              <label>
                <input type="radio" placeholder="" />
                Estate Agent
              </label>
              <label>
                <input type="radio" placeholder="" />
                Property Developer
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
              <input type="text" placeholder="Pamela Keane" />
            </label>
            <label>
              Company name
              <input type="text" placeholder="company name" />
            </label>
            <label>
              Street
              <input type="text" placeholder="street" />
            </label>
            <label>
              Locality
              <input type="text" placeholder="Locality" />
            </label>
            <label>
              State
              <input type="text" placeholder="state" />
            </label>
            <label>
              Country
              <input type="text" placeholder="Country" />
            </label>
            <label>
              Phone number
              <input type="text" placeholder="+41" />
            </label>
            <label>
              Mobile number 1
              <input type="text" placeholder="Mobile" />
            </label>
            <label>
              Mobile number 2
              <input type="text" placeholder="Mobile" />
            </label>
            <label>
              Whatsapp number
              <input type="text" placeholder="+41" />
            </label>
            <label>
              Email address 1
              <input type="text" placeholder="Email" />
            </label>
            <label>
              Email address 2
              <input type="text" placeholder="Email" />
            </label>

            <div className={styles.disable}>
              <input type="checkbox" />
              <p>Disable client enquiries via email</p>
            </div>
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
const ProfileFormTwo = ({ back }) => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);
  const [files, setFiles] = useState([]);

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

        <div className={styles.search}>
          <img src="/navbar/search.svg" />
          <input type="text" placeHolder="search property" />
        </div>
      </div>

      <form className={styles.AccountMainForm}>
        <div className={styles.AccountSecondFormOne}>
          <div className={styles.WebsiteForm}>
            <label>
              Website
              <input type="text" placeholder="link" />
            </label>

            <label>
              Website domain
              <input type="text" placeholder="e.g https://nutlipuk.rg" />
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
            <textarea placeholder="Information is shown as “About Us” on our website" />
          </label>
          <label>
            Your services
            <textarea placeholder="What are your company services" />
          </label>

          <div className={styles.WebsiteForm}>
            <label>
              Facebook
              <input type="text" placeholder="link" />
            </label>

            <label>
              Twitter
              <input type="text" placeholder="link" />
            </label>
          </div>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button>Cancel</button>
        <button>Save & Next</button>
      </div>
    </>
  );
};
