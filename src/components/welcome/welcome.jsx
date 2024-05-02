import { useRef, useState,useEffect } from "react";
import styles from "../../styles/welcome/welcome.module.css";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RegistrationContext } from "../../context/Register.context";
const Welcome = () => {
  const count = useRef(1);
  const [update, setUpdate] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [form, setForm] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    postcode: "",
    address1: "",
    address2: "",
    website: "",
    companyNumber: "",
    phone: "",
    mobile: "",
    businessName:"",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
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

                <label for="privateSeller">Private Seller</label>
                
                </div>

                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Agent"
                  
                  label="Agent"
                />
                <label for="Agent">Agent</label>
                </div>

                <div className={styles.radioButtonContainer}>
                <input type="radio"
                name="description"
                  value="Mortgage Broker"
                  
                  label="Mortgage Broker"
                />
                <label for="Agent">Mortgage Broker</label>
                </div>
                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Conveyancer"
                  
                  label="Conveyancer"
                />
                <label for="Conveyancer">Conveyancer</label>
                </div>
                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Buyer"
                  
                  label="Buyer"
                />
                <label for="Buyer">Buyer</label>
                
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
   <label htmlFor="title">Title</label>
   <select id="title" name="title" value={form.title} onChange={handleChange}>
     <option value="Miss">Miss</option>
     <option value="Mr">Mr</option>
     <option value="Mrs">Mrs</option>
   </select>
 </div>
 <div>
   <label htmlFor="firstName">First Name</label>
   <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="middleName">Middle Name</label>
   <input type="text" id="middleName" name="middleName" value={form.middleName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="lastName">Last Name</label>
   <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="emailAddress">Email Address</label>
   <input type="email" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="country">Country</label>
   <select id="country" name="country" value={form.country} onChange={handleChange}>
     {/* Add your country options here */}
   </select>
 </div>
 <div>
   <label htmlFor="city">City/State</label>
   <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="postalCode">Post Code</label>
   <input type="text" id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="address1">Address 1</label>
   <input type="text" id="address1" name="address1" value={form.address1} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="address2">Address 2</label>
   <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="phoneNumber">Phone Number</label>
   <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
 </div>
 <div>
   <label htmlFor="mobileNumber">Mobile Number</label>
   <input type="tel" id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
 </div>
 </div>

 <div className={styles.submit}>
   <button type="submit"  >Continue</button>
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
        <label htmlFor="title">Title</label>
        <select id="title" name="title" value={form.title} onChange={handleChange}>
          <option value="Miss">Miss</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
        </select>
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="middleName">Middle Name</label>
        <input type="text" id="middleName" name="middleName" value={form.middleName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="emailAddress">Email Address</label>
        <input type="email" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" name="country" value={form.country} onChange={handleChange}>
          {/* Add your country options here */}
        </select>
      </div>
      <div>
        <label htmlFor="city">City/State</label>
        <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="postalCode">Post Code</label>
        <input type="text" id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
      </div>
            </div>

        <div className={styles.form}>
        <div>
        <label htmlFor="address1">Address 1</label>
        <input type="text" id="address1" name="address1" value={form.address1} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="address2">Address 2</label>
        <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} />
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
        <label htmlFor="companyNumber">Company Number</label>
        <input type="text" id="companyNumber" name="companyNumber" value={form.companyNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input type="tel" id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
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
    <label htmlFor="title">Title</label>
    <select id="title" name="title" value={form.title} onChange={handleChange}>
      <option value="Miss">Miss</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
    </select>
  </div>
  <div>
    <label htmlFor="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="middleName">Middle Name</label>
    <input type="text" id="middleName" name="middleName" value={form.middleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="emailAddress">Email Address</label>
    <input type="email" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="country">Country</label>
    <select id="country" name="country" value={form.country} onChange={handleChange}>
      {/* Add your country options here */}
    </select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postalCode">Post Code</label>
    <input type="text" id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="address1">Address 1</label>
    <input type="text" id="address1" name="address1" value={form.address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="address2">Address 2</label>
    <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} />
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
    <label htmlFor="companyNumber">Company Number</label>
    <input type="text" id="companyNumber" name="companyNumber" value={form.companyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="mobileNumber">Mobile Number</label>
    <input type="tel" id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
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
    <label htmlFor="title">Title</label>
    <select id="title" name="title" value={form.title} onChange={handleChange}>
      <option value="Miss">Miss</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
    </select>
  </div>
  <div>
    <label htmlFor="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="middleName">Middle Name</label>
    <input type="text" id="middleName" name="middleName" value={form.middleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="emailAddress">Email Address</label>
    <input type="email" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="country">Country</label>
    <select id="country" name="country" value={form.country} onChange={handleChange}>
      {/* Add your country options here */}
    </select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postalCode">Post Code</label>
    <input type="text" id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="address1">Address 1</label>
    <input type="text" id="address1" name="address1" value={form.address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="address2">Address 2</label>
    <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} />
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
    <label htmlFor="companyNumber">Company Number</label>
    <input type="text" id="companyNumber" name="companyNumber" value={form.companyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="mobileNumber">Mobile Number</label>
    <input type="tel" id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
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
    <label htmlFor="title">Title</label>
    <select id="title" name="title" value={form.title} onChange={handleChange}>
      <option value="Miss">Miss</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
    </select>
  </div>
  <div>
    <label htmlFor="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="middleName">Middle Name</label>
    <input type="text" id="middleName" name="middleName" value={form.middleName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="emailAddress">Email Address</label>
    <input type="email" id="emailAddress" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="country">Country</label>
    <select id="country" name="country" value={form.country} onChange={handleChange}>
      {/* Add your country options here */}
    </select>
  </div>
  <div>
    <label htmlFor="city">City/State</label>
    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="postalCode">Post Code</label>
    <input type="text" id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
  </div>
        </div>

    <div className={styles.form}>
    <div>
    <label htmlFor="address1">Address 1</label>
    <input type="text" id="address1" name="address1" value={form.address1} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="address2">Address 2</label>
    <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} />
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
    <label htmlFor="companyNumber">Company Number</label>
    <input type="text" id="companyNumber" name="companyNumber" value={form.companyNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="mobileNumber">Mobile Number</label>
    <input type="tel" id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
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

