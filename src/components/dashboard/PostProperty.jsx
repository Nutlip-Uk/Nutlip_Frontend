import styles from "../../styles/dashboard/postProperty.module.css";
import { useRef, useState } from "react";
import { Image } from "next/image";

const PostProperty = () => {
  const count = useRef(1);
  const [update, setUpdate] = useState(false);

  const next = () => {
    if (count.current <= 4) {
      count.current = count.current + 1;
      setUpdate(!update);
    }
  };

  const back = () => {
    if (count.current > 1) {
      count.current = count.current - 1;
      setUpdate(!update);
    }
  };

  const [form, setForm] = useState({
    Title: "",
    purpose: "",
    typeOfProperty: "",
    subTypeOfProperty: "",
    bathrooms: "",
    bedrooms: "",
    Toilets: "",
    size: "",
    stateOfProperty: "",
    location: "",
    address: "",
    Landmark: "",
    Radius: "",
    Amount: "",
    Minimum_offer: "",
    Currency: "",
    description: "",
    Add_features: "",
    video_link: "",
    // virtual_tour_link: "",
    images: [],
    //rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/apartments", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        // Handle HTTP errors
        console.error("Server responded with an error:", response.status);
        console.log(error);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.Section}>
      {count.current === 1 && (
        <PostPropertyDetailOne
          next={next}
          form={form}
          handleChange={handleChange}
        />
      )}
      {count.current === 2 && (
        <PostPropertyDetailTwo
          next={next}
          back={back}
          form={form}
          handleChange={handleChange}
        />
      )}
      {count.current === 3 && (
        <PostPropertyDescription
          next={next}
          back={back}
          form={form}
          handleChange={handleChange}
        />
      )}
      {count.current === 4 && (
        <PostPropertyDetailsReview
          next={next}
          back={back}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {count.current === 5 && <Congratulations />}
    </form>
  );
};

export default PostProperty;

// PostPropertyDetailOne component
const PostPropertyDetailOne = ({ next, form, handleChange }) => {
  return (
    <>
      <div className={styles.Header}>
        <h1>Post Property</h1>
        <p>
          {
            "Welcome to this transaction. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Transaction ID: WYVEI112"
          }
        </p>
      </div>

      <div className={styles.FormContainer}>
        <label className={styles.title}>
          Title
          <input
            type="text"
            placeholder="e.g 2 bedroom apartment in London"
            name="Title"
            value={form.Title}
            onChange={handleChange}
          />
        </label>

        <div className={styles.threeColumn}>
          <label>
            Purpose
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              defaultValue="select"
            >
              <option name="select">Select</option>
              <option name="For_Rent" value="For_Rent">
                For Rent
              </option>
              <option name="For_Buy" value="For_Buy">
                For Buy
              </option>
            </select>
          </label>

          <label>
            Type of Property
            <select
              name="typeOfProperty"
              value={form.typeOfProperty}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="flat/apartment">Flat/Apartment</option>
              <option value="co-working_space">Co-working space</option>
              <option value="House">House</option>
              <option value="land">Land</option>
              <option value="commercial_property">Commercial property</option>
            </select>
          </label>

          <label>
            Sub type of property
            <select
              name="subTypeOfProperty"
              value={form.subTypeOfProperty}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="new_property">New Property</option>
              <option value="retirement_home">Retirement Home</option>
              <option value="auction">Auction</option>
              <option value="shared_ownership">Shared Ownership</option>
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
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
          </label>

          <label>
            Bedrooms
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
          </label>

          <label>
            Toilets
            <select
              name="Toilets"
              value={form.Toilets}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
          </label>
        </div>

        <div className={styles.twoColumn}>
          <label>
            State of property
            <select
              name="stateOfProperty"
              value={form.stateOfProperty}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="sold_stc">Sold STC</option>
              <option value="under_offer">Under offer</option>
            </select>
          </label>
          <label>
            Size
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDetailTwo = ({ next, back, form, handleChange }) => {
  return (
    <>
      <div className={styles.Header}>
        <button onClick={back}> {"< Back"}</button>
        <p>
          {
            "Welcome to this transaction. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Transaction ID: WYVEI112"
          }
        </p>
      </div>

      <div className={styles.FormContainer}>
        <div className={styles.twoColumn}>
          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              type="text"
              placeholder="Location"
            />
          </label>

          <label>
            Address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="Address"
            />
          </label>
        </div>
        <div className={styles.twoColumn}>
          <label>
            Landmark
            <input
              name="Landmark"
              value={form.Landmark}
              onChange={handleChange}
              type="text"
              placeholder="Landmark"
            />
          </label>

          <label>
            Radius
            <input
              name="Radius"
              value={form.Radius}
              onChange={handleChange}
              type="text"
              placeholder="e.g within 1.2km from landmark"
            />
          </label>
        </div>

        <div className={styles.twoColumn}>
          <label>
            Amount
            <input
              name="Amount"
              value={form.Amount}
              onChange={handleChange}
              type="text"
              placeholder="Amount"
            />
          </label>

          <label>
            Minimum Offer
            <input
              name="Minimum_offer"
              value={form.Minimum_offer}
              onChange={handleChange}
              type="text"
              placeholder="Amount"
            />
          </label>
        </div>

        <label className={styles.currency}>
          currency
          <select
            name="Currency"
            value={form.Currency}
            onChange={handleChange}
            defaultValue="select"
          >
            Select
            <option value="select">Select</option>
            <option name="USD" value="USD">USD</option>
            <option name="EUR" value="EUR">EUR</option>
            <option name="GBP" value="GBP">GBP</option>
          </select>
        </label>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDescription = ({
  next,
  back,
  handleSubmit,
  form,
  handleChange,
}) => {
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
        <p>
          {
            "Welcome to this transaction. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Transaction ID: WYVEI112"
          }
        </p>
      </div>

      <div className={styles.FormContainer}>
        <label className={styles.title}>
          Description
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            placeholder="e.g 2 bedroom apartment in London"
          />
        </label>

        <label className={styles.title}>
          Add Features
          <select
          name="Add_features"
            value={form.Add_features}
            onChange={handleChange}
            defaultValue="select"
          >
            select
            <option value="select" name="select">
              Select
            </option>
            <option value="Elevator" name="Elevator">
              Elevator
            </option>
            <option value="stairs" name="stairs">
              Stairs
            </option>
          </select>
        </label>

        <div className={styles.twoColumn}>
          <label>
            Video Link
            <input
              name="video_link"
              value={form.video_link}
              onChange={handleChange}
              type="text"
              placeholder="Link"
            />
          </label>
          <label>
            Virtual tour link
            <input
              name="virtual_tour_link"
              value={form.virtual_tour_link}
              onChange={handleChange}
              type="text"
              placeholder="Link"
            />
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
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button type="submit">Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDetailsReview = ({ next, back, form }) => {
  return (
    <>
      <div className={styles.Header}>
        <button onClick={back}>
          {"<"} <h1>Detail Reviews</h1>
        </button>
        <p>
          {
            "Welcome to this transaction. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Transaction ID: WYVEI112"
          }
        </p>
      </div>

      <div className={styles.detailInfo}>
        <div className={styles.price}>
          <h1>{form.amount}</h1>
        </div>

        <div className={styles.facilities}>
          <span>
            <img
              src="/images/mdi-bedroom-outline.svg"
              width={25}
              height={25}
              alt="bedroom-thumbnail"
            />
            {form.bedrooms}
          </span>
          <span>
            <img
              src="/images/mdi-shower.svg"
              width={25}
              height={25}
              alt="bathroom-thumbnail"
            />
            {form.bathrooms}
          </span>
          <span>
            <img
              src="/images/material-symbols-chair-outline.svg"
              width={25}
              height={25}
              alt="livingroom-thumbnail"
            />
            3
          </span>
          <span>
            <img
              src="https://img.icons8.com/ios/50/toilet-bowl.png"
              width={25}
              height={25}
              alt="toilet-bowl"
            />
            {form.toilets}
          </span>
        </div>

        <hr />
      </div>

      <div className={styles.DetailinfoContainer}>
        <div className={styles.info}>
          <p>{form.title}</p>
          <p>{form.location}</p>
          <p>{form.description}</p>
        </div>

        <div className={styles.feature}>
          <p>Key features</p>
          <ul>
            <li>Sold in March 2023</li>
            <li>17ft garage and off street parking</li>
            <li>41ft secluded rear garden</li>
            <li>South facing terrace to the front with fantastic views</li>
          </ul>
        </div>
      </div>

      <div className={styles.extraInfo}>
        <p className={styles.readMore}>Read more</p>
      </div>

      <div className={styles.DetailImgContainer}>
        <img src={""} width={210} height={200} />
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};
const Congratulations = () => {
  return (
    <>
      <div>
        <h1>Congratulations</h1>
      </div>
    </>
  );
};
