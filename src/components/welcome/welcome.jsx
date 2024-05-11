import { useRef, useState,useEffect,useContext } from "react";
import styles from "../../styles/welcome/welcome.module.css";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RegistrationContext } from "../../context/Register.context";
import { LoginContext } from "../../context/Login.context";
const Welcome = () => {
  const { userInformation} = React.useContext(LoginContext);
  const count = useRef(1);
  const [update, setUpdate] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [form, setForm] = useState({
    description:selectedRole,
    Title: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    email: "",
    Country: "",
    city: "",
    postCode: "",
    Address1: "",
    Address2: "",
    website: "",
    CompanyNumber: "",
    PhoneNumber: "",
    MobileNumber: "",
    BusinessName:"",
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      description: selectedRole,
    }));
  }, [selectedRole]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userInformation.user.id;
  
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Form successfully updated", data);
        // Optionally, provide feedback to the user indicating success
      } else {
        console.log("Form update failed");
        // Optionally, provide feedback to the user indicating failure
      }
    } catch (error) {
      console.error("Error updating form:", error);
      // Optionally, provide feedback to the user indicating failure
    }
  };

  const next = (value) => {
    setSelectedRole(value);
    if (count.current <= 4) {
      count.current = count.current + 1;
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
    }
  };

  const { setIsUserFirstTime } = React.useContext(RegistrationContext);

  const cancelBox=()=>{
    setIsUserFirstTime(false)
  }



  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.cancelButton}>
          <button onClick={cancelBox}>{"X"}</button>
        </div>
        
        <div className={styles.box}>
        {count.current === 1 && <WelcomePage next={next} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        {count.current === 2 && <WhatDescribesYou next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        {count.current === 3 && selectedRole === "Private Seller" && <PrivateSellerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Agent" && <AgentForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Mortgage Broker" && <MortgageBrokerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Conveyancer" && <ConveyancerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Buyer" && <BuyerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        
        </div>
      </div>
    </div>
  );
};

export default Welcome;

const WelcomePage = ({next,back}) => {
  return (
    <>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeImg}>
          <img src="/welcome/first.svg" alt="" />
        </div>
        <div className={styles.welcomeText}>
          <p>Welcome to Nutlip</p>
          <p>
            {
              "Hello!. Welcome to the real estate marketplace where you have access to thousands of properties for rent and buy, including those on the blockchain."
            }
          </p>
          <button onClick={next}>continue</button>
        </div>
      </div>
    </>
  );
};

const WhatDescribesYou = ({next}) => {
    const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleContinue = () => {
    if (selectedValue) {
      next(selectedValue);
    }
  };

  useEffect(() => {
    const radioButtons = document.querySelectorAll('.radioButtonContainer input[type="radio"]');
    
    radioButtons.forEach((radio) => {
      radio.addEventListener('change', function() {
        radioButtons.forEach((rb) => {
          if (rb.checked) {
            rb.closest('.radioButtonContainer').style.border = '1px solid blue';
          } else {
            rb.closest('.radioButtonContainer').style.border = 'none';
          }
        });
      });
    });
  }, []);

  
  return (
    <>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeImg}>
          <img src="/welcome/first.svg" alt="" />
        </div>
        <div className={styles.DescribesText}>
          <p>What best describes you?</p>
          <p>
            {"Kindly let us know for a personalized experience on our platform"}
          </p>

          <div className="">
          <form className={styles.DescribeForm}>
              <div
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedValue}
                onChange={handleChange}
                className={styles.radioGroup}
              >
                <div className={styles.radioButtonContainer}>

                <input type="radio"
                id="privateSeller"
                name="description"
                  value="Private Seller"
                  
                  label="Private Seller"
                />

                <label htmlFor="privateSeller">Private Seller</label>
                
                </div>

                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Agent"
                  
                  label="Agent"
                />
                <label htmlFor="Agent">Agent</label>
                </div>

                <div className={styles.radioButtonContainer}>
                <input type="radio"
                name="description"
                  value="Mortgage Broker"
                  
                  label="Mortgage Broker"
                />
                <label htmlFor="Agent">Mortgage Broker</label>
                </div>
                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Conveyancer"
                  
                  label="Conveyancer"
                />
                <label htmlFor="Conveyancer">Conveyancer</label>
                </div>
                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Buyer"
                  
                  label="Buyer"
                />
                <label htmlFor="Buyer">Buyer</label>
                
                </div>


               
               
                
              
              </div>
              <button onClick={handleContinue}>continue</button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

const PrivateSellerForm = ({form, handleSubmit, handleChange}) => {
   
  

      return (<>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>

<div className={styles.formHeader}>
   <h2>Private Sellers</h2>
   <p>Kindly fill this form, for a more personalized experience.</p>
</div>
 
 <div className={styles.form}>
 <div>
   <label htmlFor="Title">Title</label>
   <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
 </div>
 <div>
   <label htmlFor="FirstName">First Name</label>
   <input type="text" id="FirstName" name="FirstName" value={form.FirstName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="MiddleName">Middle Name</label>
   <input type="text" id="MiddleName" name="MiddleName" value={form.MiddleName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="LastName">Last Name</label>
   <input type="text" id="LastName" name="LastName" value={form.LastName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="email">Email Address</label>
   <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="Country">Country</label>
   <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option value="United States" name="United States">United States</option>
  <option value="Canada" name="Canada">Canada</option>
  <option value="United Kingdom" name="United Kingdom">United Kingdom</option>
  <option value="Australia" name="Australia">Australia</option>
  <option value="New Zealand" name="New Zealand">New Zealand</option>
  <option value="Germany" name="Germany">Germany</option>
  <option value="France" name="France">France</option>
  <option value="Spain" name="Spain">Spain</option>
  <option value="Italy" name="Italy">Italy</option>
  <option value="Japan" name="Japan">Japan</option>
  <option value="China" name="China">China</option>
  <option value="India" name="India">India</option>
  <option value="Brazil" name="Brazil">Brazil</option>
  <option value="Mexico" name="Mexico">Mexico</option>
  <option value="Russia" name="Russia">Russia</option>
</select>

 </div>
 <div>
   <label htmlFor="city">City/State</label>
   <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="postCode">Post Code</label>
   <input type="text" id="postCode" name="postCode" value={form.postCode} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="Address1">Address 1</label>
   <input type="text" id="Address1" name="Address1" value={form.Address1} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="Address2">Address 2</label>
   <input type="text" id="Address2" name="Address2" value={form.Address2} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="PhoneNumber">Phone Number</label>
   <input type="tel" id="PhoneNumber" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="MobileNumber">Mobile Number</label>
   <input type="tel" id="MobileNumber" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
 </div>
 </div>

 <div className={styles.submit}>
   <button type="submit">Continue</button>
 </div>
</form>
        </div>
        </>
      )
};

const MortgageBrokerForm = ({form, handleSubmit, handleChange}) => {
    

    return (
        <>
        <div className={styles.MainContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
            <h2>Mortgage Broker</h2>
            <p>Kindly fill this form, for a more personalized experience.</p>
         </div>
          
            <div className={styles.formFour}>
            <div>
        <label htmlFor="Title">Title</label>
        <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
      </div>
      <div>
        <label htmlFor="FirstName">First Name</label>
        <input type="text" id="FirstName" name="FirstName" value={form.FirstName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="MiddleName">Middle Name</label>
        <input type="text" id="MiddleName" name="MiddleName" value={form.MiddleName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="LastName">Last Name</label>
        <input type="text" id="LastName" name="LastName" value={form.LastName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Country">Country</label>
        <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option value="United States" name="United States">United States</option>
  <option value="Canada" name="Canada">Canada</option>
  <option value="United Kingdom" name="United Kingdom">United Kingdom</option>
  <option value="Australia" name="Australia">Australia</option>
  <option value="New Zealand" name="New Zealand">New Zealand</option>
  <option value="Germany" name="Germany">Germany</option>
  <option value="France" name="France">France</option>
  <option value="Spain" name="Spain">Spain</option>
  <option value="Italy" name="Italy">Italy</option>
  <option value="Japan" name="Japan">Japan</option>
  <option value="China" name="China">China</option>
  <option value="India" name="India">India</option>
  <option value="Brazil" name="Brazil">Brazil</option>
  <option value="Mexico" name="Mexico">Mexico</option>
  <option value="Russia" name="Russia">Russia</option>
</select>
      </div>
      <div>
        <label htmlFor="city">City/State</label>
        <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="postCode">Post Code</label>
        <input type="text" id="postCode" name="postCode" value={form.postCode} onChange={handleChange} />
      </div>
            </div>

        <div className={styles.form}>
        <div>
        <label htmlFor="Address1">Address 1</label>
        <input type="text" id="Address1" name="Address1" value={form.Address1} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Address2">Address 2</label>
        <input type="text" id="Address2" name="Address2" value={form.Address2} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="BusinessName">Business Name</label>
        <input type="text" id="BusinessName" name="BusinessName" value={form.BusinessName} onChange={handleChange} />
      </div>
        </div>

      <div className={styles.formFour}>
      <div>
        <label htmlFor="website">Website</label>
        <input type="url" id="website" name="website" value={form.website} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="CompanyNumber">Company Number</label>
        <input type="text" id="CompanyNumber" name="CompanyNumber" value={form.CompanyNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="PhoneNumber">Phone Number</label>
        <input type="tel" id="PhoneNumber" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="MobileNumber">Mobile Number</label>
        <input type="tel" id="MobileNumber" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
      </div>
      </div>

      <div className={styles.submit}>
            <button type="submit"  >Continue</button>
          </div>
      </form>
        </div>
        </>
    );
};
const ConveyancerForm = ({form, handleSubmit, handleChange}) => {
    

    return (
        <>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
        <h2>Convenyancer</h2>
        <p>Kindly fill this form, for a more personalized experience.</p>
     </div>
      
        <div className={styles.formFour}>
        <div>
    <label htmlFor="Title">Title</label>
    <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
  </div>
  <div>
    <label htmlFor="FirstName">First Name</label>
    <input type="text" id="FirstName" name="FirstName" value={form.FirstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MiddleName">Middle Name</label>
    <input type="text" id="MiddleName" name="MiddleName" value={form.MiddleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="LastName">Last Name</label>
    <input type="text" id="LastName" name="LastName" value={form.LastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option value="United States" name="United States">United States</option>
  <option value="Canada" name="Canada">Canada</option>
  <option value="United Kingdom" name="United Kingdom">United Kingdom</option>
  <option value="Australia" name="Australia">Australia</option>
  <option value="New Zealand" name="New Zealand">New Zealand</option>
  <option value="Germany" name="Germany">Germany</option>
  <option value="France" name="France">France</option>
  <option value="Spain" name="Spain">Spain</option>
  <option value="Italy" name="Italy">Italy</option>
  <option value="Japan" name="Japan">Japan</option>
  <option value="China" name="China">China</option>
  <option value="India" name="India">India</option>
  <option value="Brazil" name="Brazil">Brazil</option>
  <option value="Mexico" name="Mexico">Mexico</option>
  <option value="Russia" name="Russia">Russia</option>
</select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postCode">Post Code</label>
    <input type="text" id="postCode" name="postCode" value={form.postCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="Address1">Address 1</label>
    <input type="text" id="Address1" name="Address1" value={form.Address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Address2">Address 2</label>
    <input type="text" id="Address2" name="Address2" value={form.Address2} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="BusinessName">Business Name</label>
    <input type="text" id="BusinessName" name="BusinessName" value={form.BusinessName} onChange={handleChange} />
  </div>
    </div>

  <div className={styles.formFour}>
  <div>
    <label htmlFor="website">Website</label>
    <input type="url" id="website" name="website" value={form.website} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="CompanyNumber">Company Number</label>
    <input type="text" id="CompanyNumber" name="CompanyNumber" value={form.CompanyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="PhoneNumber">Phone Number</label>
    <input type="tel" id="PhoneNumber" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MobileNumber">Mobile Number</label>
    <input type="tel" id="MobileNumber" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
  </div>
  </div>

  <div className={styles.submit}>
        <button type="submit"  >Continue</button>
      </div>
  </form>
      </div>
    </>
    );
};
const BuyerForm = ({form, handleSubmit, handleChange}) => {
    

    return (
        <>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
        <h2>Buyer</h2>
        <p>Kindly fill this form, for a more personalized experience.</p>
     </div>
      
        <div className={styles.formFour}>
        <div>
    <label htmlFor="Title">Title</label>
    <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
  </div>
  <div>
    <label htmlFor="FirstName">First Name</label>
    <input type="text" id="FirstName" name="FirstName" value={form.FirstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MiddleName">Middle Name</label>
    <input type="text" id="MiddleName" name="MiddleName" value={form.MiddleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="LastName">Last Name</label>
    <input type="text" id="LastName" name="LastName" value={form.LastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option value="United States" name="United States">United States</option>
  <option value="Canada" name="Canada">Canada</option>
  <option value="United Kingdom" name="United Kingdom">United Kingdom</option>
  <option value="Australia" name="Australia">Australia</option>
  <option value="New Zealand" name="New Zealand">New Zealand</option>
  <option value="Germany" name="Germany">Germany</option>
  <option value="France" name="France">France</option>
  <option value="Spain" name="Spain">Spain</option>
  <option value="Italy" name="Italy">Italy</option>
  <option value="Japan" name="Japan">Japan</option>
  <option value="China" name="China">China</option>
  <option value="India" name="India">India</option>
  <option value="Brazil" name="Brazil">Brazil</option>
  <option value="Mexico" name="Mexico">Mexico</option>
  <option value="Russia" name="Russia">Russia</option>
</select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postCode">Post Code</label>
    <input type="text" id="postCode" name="postCode" value={form.postCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="Address1">Address 1</label>
    <input type="text" id="Address1" name="Address1" value={form.Address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Address2">Address 2</label>
    <input type="text" id="Address2" name="Address2" value={form.Address2} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="BusinessName">Business Name</label>
    <input type="text" id="BusinessName" name="BusinessName" value={form.BusinessName} onChange={handleChange} />
  </div>
    </div>

  <div className={styles.formFour}>
  <div>
    <label htmlFor="website">Website</label>
    <input type="url" id="website" name="website" value={form.website} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="CompanyNumber">Company Number</label>
    <input type="text" id="CompanyNumber" name="CompanyNumber" value={form.CompanyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="PhoneNumber">Phone Number</label>
    <input type="tel" id="PhoneNumber" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MobileNumber">Mobile Number</label>
    <input type="tel" id="MobileNumber" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
  </div>
  </div>

  <div className={styles.submit}>
        <button type="submit"  >Continue</button>
      </div>
  </form>
      </div>
    </>
    );
};

const AgentForm = ({form, handleSubmit, handleChange}) => {
    


    return (
        <>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
        <h2>Estate Agents</h2>
        <p>Kindly fill this form, for a more personalized experience.</p>
     </div>
      
        <div className={styles.formFour}>
        <div>
    <label htmlFor="Title">Title</label>
    <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
  </div>
  <div>
    <label htmlFor="FirstName">First Name</label>
    <input type="text" id="FirstName" name="FirstName" value={form.FirstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MiddleName">Middle Name</label>
    <input type="text" id="MiddleName" name="MiddleName" value={form.MiddleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="LastName">Last Name</label>
    <input type="text" id="LastName" name="LastName" value={form.LastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option value="United States" name="United States">United States</option>
  <option value="Canada" name="Canada">Canada</option>
  <option value="United Kingdom" name="United Kingdom">United Kingdom</option>
  <option value="Australia" name="Australia">Australia</option>
  <option value="New Zealand" name="New Zealand">New Zealand</option>
  <option value="Germany" name="Germany">Germany</option>
  <option value="France" name="France">France</option>
  <option value="Spain" name="Spain">Spain</option>
  <option value="Italy" name="Italy">Italy</option>
  <option value="Japan" name="Japan">Japan</option>
  <option value="China" name="China">China</option>
  <option value="India" name="India">India</option>
  <option value="Brazil" name="Brazil">Brazil</option>
  <option value="Mexico" name="Mexico">Mexico</option>
  <option value="Russia" name="Russia">Russia</option>
</select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postCode">Post Code</label>
    <input type="text" id="postCode" name="postCode" value={form.postCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="Address1">Address 1</label>
    <input type="text" id="Address1" name="Address1" value={form.Address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="Address2">Address 2</label>
    <input type="text" id="Address2" name="Address2" value={form.Address2} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="BusinessName">Business Name</label>
    <input type="text" id="BusinessName" name="BusinessName" value={form.BusinessName} onChange={handleChange} />
  </div>
    </div>

  <div className={styles.formFour}>
  <div>
    <label htmlFor="website">Website</label>
    <input type="url" id="website" name="website" value={form.website} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="CompanyNumber">Company Number</label>
    <input type="text" id="CompanyNumber" name="CompanyNumber" value={form.CompanyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="PhoneNumber">Phone Number</label>
    <input type="tel" id="PhoneNumber" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="MobileNumber">Mobile Number</label>
    <input type="tel" id="MobileNumber" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
  </div>
  </div>

  <div className={styles.submit}>
        <button type="submit" >Continue</button>
      </div>
  </form>
      </div>
    </>
    );
};

