import styles from "../../../../../styles/sell/postproperty.module.css";
import { useRef, useState } from "react";
import { Image } from "next/image";

const PostProperty = () => {
  const count = useRef(1);
  const [update, setUpdate] = useState(false); // Add state to force re-render

  const next = () => {
    if (count.current <= 4) {
      count.current = count.current + 1;
      setUpdate(!update); // Trigger a re-render
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
      setUpdate(!update); // Trigger a re-render
    }
  };


  const [form, setForm] = useState({
    title: '',
    purpose: '',
    propertyType: '',
    subPropertyType: '',
    bathrooms: '',
    bedrooms: '',
    toilets: '',
    stateOfProperty: '',
    size: '',
    location: '',
    address: '',
    landmark: '',
    radius: '',
    amount: '',
    minimumOffer: '',
    currency: '',
    description: '',
    videoLink: '',
    virtualTourLink: '',
    yearBuilt:'',
    appliances:'',
    basement:'',
    floorCovering:'',
    rooms:'',
    utilityTypes:'',
    heatingType:'',
    heatingFuel:'',
    phoneNumber:'',
    addFeatures:[],
    email:"",
    images: []  
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form data
    console.log(form)
  }

  return (
    <div className={styles.Section}>
        <div className={styles.Container}>
        {count.current === 1 && <PostPropertyDetailOne next={next} form={form} handleChange={handleChange}/>}
  {count.current === 2 && <PostPropertyDetailTwo next={next} back={back} form={form} handleChange={handleChange} />}
  {count.current === 3 && (
    <PostPropertyDescription next={next} back={back} form={form} handleChange={handleChange}/>
  )}
  {count.current === 4 && (
    <PostPropertyDetailsReview next={next} back={back} form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )}
      {count.current === 5 && <Congratulations />}
        </div>
    </div>
  );
};

export default PostProperty;

// PostPropertyDetailOne component
const PostPropertyDetailOne = ({ next, form , handleChange}) => {
  return (
    <>
      <div className={styles.Header}>
        <button>{"< Back"}</button>
        <div className={styles.headerText}>
        <h1>List your property</h1>
        <p>
          {
            "Make sure to list your property accurately, providing buyers with the right information to prevent any issues from arising in the future.         "
          }
        </p>
        </div>
      </div>

      <form className={styles.FormContainer}>
        <label className={styles.title}>
          Title
          <input
            type="text"
            placeholder="e.g Two bedroom apartment in London"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <div className={styles.threeColumn}>
          <label>
            Purpose
            <select name="purpose" value={form.purpose} onChange={handleChange}>
            <option>For Rent</option>
              <option>For Buy</option>
            </select>
          </label>

          <label>
            Type of Property
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
            >
              <option>Flat</option>
              <option>Bungalow</option>
              <option>Terraced</option>
              <option>Detached</option>
              <option>Semi-detached</option>
              <option>Park home</option>
              <option>Farm/Land</option>
              <option>Mobile home</option>
              <option>Airbnb home</option>
            </select>
          </label>

          <label>
            Sub type of property
            <select
              name="propertySubType"
              value={form.propertySubType}
              onChange={handleChange}
            >
              <option>New Property</option>
              <option>Retirement Home</option>
              <option>Auction</option>
              <option>Shared Ownership</option>
            </select>
          </label>
        </div>

        <div className={styles.threeColumn}>
          <label>
            Bathrooms
            <select
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
            >
               <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
          </label>

          <label>
            Bedrooms
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
            >
               <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
          </label>

          <label>
            Toilets
            <select name="toilets" value={form.toilets} onChange={handleChange}>
            <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
          </label>
        </div>

        <div className={styles.threeColumn}>
          <label>
            State of property
            <select
              name="propertyState"
              value={form.propertyState}
              onChange={handleChange}
            >
              <option>Sold STC</option>
              <option>Under offer</option>
            </select>
          </label>
          <label>
            Size
            <select name="size" value={form.size} onChange={handleChange}>
              <option>Select</option>
            </select>
          </label>
          <label>
            Year built
            <input name="yearBuilt" value={form.yearBuilt} onChange={handleChange} type="text" placeholder="eg. 1995"/>
          </label>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDetailTwo = ({ next, back ,handleChange,form}) => {
  return (
    <>
      <div className={styles.Header}>
        <button onClick={back}> {"< Back"}</button>
        <div className={styles.headerText}>
        <h1>Additional information</h1>
        <p>
          {
            "Provide any additional information that may be of interest to potential buyers as it may help in achieving your listing price expectations."
          }
        </p>
        </div>
      </div>

      <form className={styles.FormContainer}>
        <p><strong>Room details</strong></p>
        <div className={styles.twoColumn}>
          <label>
            Appliances
            <select name="appliances" value={form.appliances} onChange={handleChange}>
              <option>Boiler</option>
              <option>Washing machine</option>
              <option>Dishwasher</option>
              <option>Gas/Electric cooker</option>
              <option>Air conditioner</option>
              <option>Ovens</option>
              <option>Microwave</option>
              <option>Others</option>
            </select>
          </label>

          <label>
            Basement
            <select name="basement" value={form.basement} onChange={handleChange}>
              <option>Yes</option>
              <option>No</option>
            </select>
            </label>
        </div>
        <div className={styles.twoColumn}>
          <label>
            Floor covering
            <select name="floor covering" value={form.floorCovering} onChange={handleChange}>
              <option>Laminate</option>
              <option>Vinyl</option>
              <option>Tile</option>
              <option>Crapet</option>
              <option>Hardwood flooring</option>
              <option>Stone flooring</option>
              <option>Cork</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Rooms
            <select name="Rooms" value={form.rooms} onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
          </label>
        </div>


        <p><strong>Utility details</strong></p>
        <div className={styles.threeColumn}>
          <label>
            Utility Types
            <select name="Rooms" value={form.utilityTypes} onChange={handleChange}>
              <option>Electricity</option>
              <option>Heating</option>
              <option>Water</option>
            </select>
          </label>

          <label>
            Heating type
            <select name="Rooms" value={form.heatingType} onChange={handleChange}>
              <option>Boilers</option>
              <option>Furances</option>
              <option>Heat pumps</option>
              <option>Gas-Fired space heaters</option>
              <option>Electric Heaters</option>
              <option>Wood-burning and pellet stoves</option>
              <option>Fireplaces</option>
            </select>
          </label>
          <label>
            Heating fuel
            <select name="Rooms" value={form.heatingFuel} onChange={handleChange}>
              <option>Gas</option>
              <option>Electricity</option>
              <option>Solar</option>
              <option>LPG</option>
              <option>Air source heat pumps</option>
              <option>Biomass</option>
            </select>
          </label>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};


const PostPropertyDescription = ({ next, back, form , handleChange}) => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);
  const [files, setFiles] = useState([]);

  const addImageField = () => {
    const newId = imageFields.length + 1;
    setImageFields([...imageFields, { id: newId }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Check if a file was selected
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Once the file is loaded, get the data URL
        const imageUrl = reader.result;
  
        // Update the form state to include the image URL
        handleChange({
          target: {
            name: "images",
            value: [...form.images, imageUrl],
          },
        });
  
        // Update the files state
        setFiles([...files, file]);
  
        // Add a new image field
        addImageField();
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <div className={styles.Header}>
        <button onClick={back}> {"< Back"}</button>
        <h1>
          <strong>Home details</strong>
        </h1>
      </div>

      <form className={styles.FormContainer}>
        <label className={styles.description}>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} type="text" placeholder="e.g 2 bedroom apartment in London" />
        </label>

        <label className={styles.title}>
          Add Features
          <select value={form.addFeatures} onChange={handleChange}>
            <option>select</option>
          </select>
        </label>

        <div className={styles.twoColumn}>
          <label>
            Video Link
            <input name="videoLink" value={form.videoLink} onChange={handleChange} type="text" placeholder="Link" />
          </label>
          <label>
            Virtual tour link
            <input name="virtualTourLink" value={form.virtualTourLink} onChange={handleChange} type="text" placeholder="Link" />
          </label>
        </div>

        <div className={styles.inputFieldContainer}>
          <p>Upload pictures</p>

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
      </form>
      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDetailsReview = ({ next, back ,form,handleSubmit,handleChange}) => {
  return (
    <>
      <div className={styles.Header}>
        <button onClick={back}>
          {"< Back"}
        </button>
        <div className={styles.headerText}>
        <h1>Contact information</h1>
        <p>
          {
            "Potential buyers will contact you through the email address you use to register on Nutlip. You must also add your phone number to the listing here."
          }
        </p>
        </div>
      </div>

      <form className={styles.FormContainer}>
        <label className={styles.title}>
            Phone number

            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} type="text" placeholder="0123456"/>
        </label>

        <label className={styles.title}>
        Preferred email address

            <input name="email" value={form.email} onChange={handleChange} type="text" placeholder="Email Address"/>
        </label>


        <div  className={styles.phoneCheckbox}>
        <input type="checkbox" id="myCheckbox"/>
        <label for="myCheckbox">I agree to the terms and condition of posting a property on nutlip. I consent to all of nutlip’s terms. This includes all privacy policy.</label>
        </div>
      </form>

      
      <div className={styles.buttonContainer}>
        <button>Cancel</button>
        <button onClick={handleSubmit}> Post for sale by Owner</button>
      </div>
    </>
  );
};
const Congratulations = () => {
  return (
    <>
      <div>
        <h1>Property Listing on its way!</h1>
        <p>Your listing has been submitted and is currently under review. You will be required to verify the property listed within the next fe minutes. Please keep your device on and nearby. Failure to verify the property listed may result in the rejection of your listing and require a re-submission.</p>

        <strong>It may take up to 48-72 hours after verification to see your property go live on the platform. Thank you for listing with Nutlip.</strong>
        <p>Questions about the verification process? Visit our <strong>Help Center </strong>for more information.</p>
      </div>
    </>
  );
};
