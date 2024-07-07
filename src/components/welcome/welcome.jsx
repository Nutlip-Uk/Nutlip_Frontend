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
import { Cascader, Input, Select, Space } from 'antd';
const Welcome = () => {
  const { userInformation , setUserInformation,handleWelcome} = React.useContext(LoginContext);
  const count = useRef(1);
  const [update, setUpdate] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const [form, setForm] = useState({

    userType:selectedRole,

    Title: "",

    FirstName: "",

    MiddleName: "",
     
    LastName: "",

    email: userInformation.user.email,

    Country: "",

    city: "",

    PostCode: "",

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
      userType: selectedRole,
    }));
  }, [selectedRole]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handlePutResponse = async (data) => {
    // Update newUser in userInformation in state
    await setUserInformation((prevState) => {
      const updatedUserInfo = {
        ...prevState,
        user: {
          ...prevState.user,
          newUser: false,
        },
      };
      updateLocalStorage(updatedUserInfo);
      return updatedUserInfo;
    });
  };
  
  const updateLocalStorage = (updatedUserInfo) => {
    console.log("Storing updated userInformation:", updatedUserInfo);
    localStorage.setItem('userInformation', JSON.stringify(updatedUserInfo));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userInformation.user.id;
    console.log("Form data:", form);
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
        console.log(data);
        await handleWelcome()
        next();
      } else {
        console.log("Form update failed");
        // Log the response body if available
        const responseBody = await response.text();
        console.error("Form update failed. Response:", responseBody);
        console.log(error);
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



  return (
    <div className={styles.Section}>
      <div className={styles.container}>
        <div className={styles.cancelButton}>
         {/*  <button onClick={cancelBox}>{"X"}</button> */}
        </div>
        
        <div className={styles.box}>
        {count.current === 1 && <WelcomePage next={next} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        {count.current === 2 && <WhatDescribesYou next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        {count.current === 3 && selectedRole === "property_seeker" && <PropertySeeker next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit} userInformation={userInformation}/>  }
          {count.current === 3 && selectedRole === "Real_estate_agent" && <AgentForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Mortgage_broker" && <MortgageBrokerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "Conveyancer" && <ConveyancerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "private_seller" && <PrivateSellerForm next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          {count.current === 3 && selectedRole === "guest" && <Guest next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>}
          
        {count.current === 4 && <Congratulations next={next} back={back} handlePutResponse={handlePutResponse}/>}
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
                  value="property_seeker"
                  
                  label="property_seeker"
                />

                <label htmlFor="property_seeker">Property Seeker</label>
                
                </div>

                <div className={styles.radioButtonContainer}>

                <input type="radio"
                name="description"
                  value="Real_estate_agent"
                  
                  label="Real_estate_agent"
                />
                <label htmlFor="Agent">Agent</label>
                </div>

                <div className={styles.radioButtonContainer}>
                <input type="radio"
                name="description"
                  value="Mortgage_broker"
                  
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

                  value="private_seller"
                  
                  label="Private Seller"

                />
                <label htmlFor="Private seller">Private seller</label>
                
                </div>
                <div className={styles.radioButtonContainer}>

                <input type="radio"

                  name="description"

                  value="guest"
                  
                  label="guest"

                />
                <label htmlFor="guest">Guest</label>
                
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

const PropertySeeker = ({form, handleSubmit, handleChange, userInformation}) => {
   
  

      return (<>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>

<div className={styles.formHeader}>
   <h2>Property Seeker</h2>
   <p>Kindly fill this form, for a more personalized experience.</p>
</div>
 
 <div className={styles.form2}>

 <div>
   <label htmlFor="Title">Title</label>
   <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
    <option name="select" >Select</option>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
 </div>
  
 
  <div>
    <label htmlFor="fullname">Full Name</label>
    <input type="fullname" id="fullname" name="fullname" value={userInformation.user.name} placeHolder={userInformation.user.name} disabled/>
  </div>
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" name="email" value={form.email} placeHolder={userInformation.user.email} disabled/>
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

const Guest = ({form, handleSubmit, handleChange, userInformation}) => {
   
  

      return (<>
        <div className={styles.MainContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>

<div className={styles.formHeader}>
   <h2>Property Seeker</h2>
   <p>Kindly fill this form, for a more personalized experience.</p>
</div>
 
 <div className={styles.form2}>

 <div>
   <label htmlFor="Title">Title</label>
   <select id="Title" name="Title" value={form.Title} onChange={handleChange}>
    <option name="select" >Select</option>
     <option name="Miss" value="Miss">Miss</option>
     <option name="Mr" value="Mr">Mr</option>
     <option name="Mrs" value="Mrs">Mrs</option>
   </select>
 </div>
  
 
  <div>
    <label htmlFor="fullname">Full Name</label>
    <input type="fullname" id="fullname" name="fullname" value={userInformation?.user?.name} placeholder={userInformation?.user?.name} disabled/>
  </div>
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" name="email" value={form.email} placeholder={userInformation?.user?.email} disabled/>
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
    <option name="select" >Select</option>
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
   <input type="email" id="email" name="email" value={form.email} onChange={handleChange} disabled/>
 </div>
 <div>
   <label htmlFor="Country">Country</label>
   <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
    <option name="select">Select</option>
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
   <label htmlFor="PostCode">Post Code</label>
   <input type="text" id="PostCode" name="PostCode" value={form.PostCode} onChange={handleChange} />
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
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} disabled/>
      </div>
      <div>
        <label htmlFor="Country">Country</label>
        <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
          <option name="select">Select</option>
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
        <label htmlFor="PostCode">Post Code</label>
        <input type="text" id="PostCode" name="PostCode" value={form.PostCode} onChange={handleChange} />
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
        <Input addonBefore="http://"  value={form.website} onChange={handleChange} />
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
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} disabled/>
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
      <option name="select">Select</option>
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
    <label htmlFor="PostCode">Post Code</label>
    <input type="text" id="PostCode" name="PostCode" value={form.PostCode} onChange={handleChange} />
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
    <Input addonBefore="http://" value={form.website} onChange={handleChange} name="website" />
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
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} disabled/>
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
      <option name="select">Select</option>
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
    <label htmlFor="PostCode">Post Code</label>
    <input type="text" id="PostCode" name="PostCode" value={form.PostCode} onChange={handleChange} />
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
    <Input addonBefore="http://"  value={form.website} onChange={handleChange}   />
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
        <h2>Real Estate Agents</h2>
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
    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} disabled/>
  </div>
  <div>
    <label htmlFor="Country">Country</label>
    <select id="Country" name="Country" value={form.Country} onChange={handleChange}>
      <option name="select">Select</option>
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
    <label htmlFor="PostCode">Post Code</label>
    <input type="text" id="PostCode" name="PostCode" value={form.PostCode} onChange={handleChange} />
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
    <Input addonBefore="http://" value={form.website} onChange={handleChange} name="website" />
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

 const Congratulations = ({handlePutResponse}) => {
  return (
    <>
      <div className={styles.welcomeContainer}>

       <div className={styles.congratulationsContainer}>
       <div className={styles.congratulationsImg}>
          <img src="./congratulations.svg" alt=""/>
          <p>{"Nice Job!!"}</p>
        </div>
        
        <p className={styles.Thankyou}>{"Thank you for completing the forms. Enjoy the Nutlip platform."}</p>
        <button onClick={handlePutResponse()}>proceed</button>
       </div>

      </div>
    </>
  )
 }