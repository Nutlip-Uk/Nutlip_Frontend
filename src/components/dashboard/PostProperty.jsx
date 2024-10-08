import styles from "../../styles/dashboard/postProperty.module.css";
import { useRef, useState, useContext, useEffect } from "react";
import { Image } from "next/image";
import jwtDecode from "jwt-decode";
import mongoose, { set } from "mongoose";
import UploadImage from "../uploadImage";
import { ImageContext, useImageContext } from "../../context/ImageContext.context";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaPlus } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Cascader, Input, Select, Space } from 'antd';
import { PlacesAutocomplete } from "../Suggestion";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useRouter } from "next/router";
import Loading from "../Loading";
import { toast } from "react-toastify";
const PostProperty = () => {
  const count = useRef(1);
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const { url, setUrl } = useContext(ImageContext);
  const [fileInputs, setFileInputs] = useState([
    { file: null, preview: null, status: "Upload" },
  ]);
  const [showUploadMessage, setShowUploadMessage] = useState([]);

  const { loading, setLoading } = useImageContext()

  const [form, setForm] = useState({
    userId: "",
    Title: "",
    purpose: "",
    typeOfProperty: "",
    subTypeOfProperty: "",
    bathrooms: "",
    bedrooms: "",
    Toilets: "",
    size: "",
    TenureOfProperty: "",
    location: "",
    address: "",
    Landmark: "",
    Radius: "",
    Amount: "",
    Minimum_offer: "",
    Currency: "",
    description: "",
    Add_features: [],
    video_link: "",
    virtual_tour_link: "",
    images: [],
    LivingRoom: "",
    FloorPlan: [],
    //rating: "",
  });

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

  const handleImageChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const previewURL = URL.createObjectURL(selectedFile);

    setFileInputs((prevFileInputs) => {
      const newFileInputs = [...prevFileInputs];
      newFileInputs[index].file = selectedFile;
      newFileInputs[index].preview = previewURL;
      return newFileInputs;
    });

    console.log(`Selected file for input ${index}:`, selectedFile);
  };

  const handleFloorPlanUpload = async (index) => {
    const selectedFile = fileInputs[index].file;
    if (!selectedFile) return;

    console.log(`Starting upload for input ${index}:`, selectedFile);

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        console.log(`Upload progress for input ${index}:`, snapshot);
      },
      (error) => {
        // Error function ...
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl((prevUrls) => [...prevUrls, downloadURL]);
        setForm((prevForm) => ({
          ...prevForm,
          FloorPLan: [...prevForm.FloorPlan, downloadURL],
        }));
        setFileInputs((prevFileInputs) => {
          const newFileInputs = [...prevFileInputs];
          newFileInputs[index].status = "Upload Successful";
          return newFileInputs;
        });
        console.log(`Upload successful for input ${index}:`, downloadURL);
      }
    );

    setShowUploadMessage((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[index] = true;
      return newMessages;
    });

    setTimeout(() => {
      setShowUploadMessage((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[index] = false;
        return newMessages;
      });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userId:", form.userId);
    console.log("Form data:", form);

    setLoading(true);

    try {
      // Upload images first
      const uploadedImageUrls = await Promise.all(
        fileInputs.map(async (input, index) => {
          if (input.file) {
            return await handleUpload(index);
          }
          return null;
        })
      );

      // Filter out null values and update form with new image URLs
      const newImageUrls = uploadedImageUrls.filter(url => url !== null);
      const updatedForm = {
        ...form,
        images: [...form.images, ...newImageUrls]
      };

      // Now submit the form with updated image URLs
      const response = await fetch("https://nutlip-server.uc.r.appspot.com/api/apartments/create-apartment", {
        method: "POST",
        body: JSON.stringify(updatedForm),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
        toast.success("Property created successfully");
        router.push("/dashboard?option=listing");
        next();
        setLoading(false);
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
        setLoading(false);
        toast.error("Error submitting form");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error submitting form");
      setLoading(false);


    } finally {
      setLoading(false);
    }
  };


  const handleUpload = async (index) => {
    const selectedFile = fileInputs[index].file;
    if (!selectedFile) return null;

    console.log(`Starting upload for input ${index}:`, selectedFile);

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress for input ${index}: ${progress}%`);
          // Update UI to show progress if desired
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(`Upload successful for input ${index}:`, downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
  };


  const addImageInput = () => {
    setFileInputs((prevFileInputs) => [
      ...prevFileInputs,
      { file: null, preview: null, status: "Upload" },
    ]);
    console.log("Added new image input. Total inputs:", fileInputs.length + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,  // Update the form field with the correct name
    }));
    console.log(`Form field changed: ${name} = ${value}`);
  };

  useEffect(() => {
    // Retrieve the userInformation from the local storage
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    console.log("userInformation:", userInformation);

    if (userInformation && userInformation.user) {
      // Extract the userId from the userInformation object
      const userId = userInformation.user.id;
      console.log("userId:", userId);
      if (userId) {
        setForm((prevForm) => ({ ...prevForm, userId }));
      }
    }
  }, []);


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
          handleUpload={handleUpload}
          handleImageChange={handleImageChange}
          fileInputs={fileInputs}
          addImageInput={addImageInput}
          url={url}
          showUploadMessage={showUploadMessage}
          handleFloorPlanUpload={handleFloorPlanUpload}
          setForm={setForm}

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
      {count.current === 5 && <Congratulations back={back} />}
    </form>
  );
};

export default PostProperty;

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
              <option name="For_Sale" value="For_Sale">
                For Sale
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
              <option value="Flat">Flat</option>
              <option value="Detached">Detached</option>
              <option value="Mid-Terrace">Mid-Terrace</option>
              <option value="End-of-Terrace">End-of-Terrace</option>
              <option value="Terrace">Terrace</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Cottage">Cottage</option>
              <option value="Townhouse">Town house</option>
              <option value="Mansion">Mansion</option>

            </select>
          </label>
          {/* <label>
            Sub-type of Property
            <select
              name="subTypeOfProperty"
              value={form.subTypeOfProperty}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option value="Flat">Flat</option>
              <option value="Detached">Detached</option>
              <option value="MidTerrace">Mid-Terrace</option>
              <option value="EndofTerrace">End-of-Terrace</option>
              <option value="Terrace">Terrace</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Cottage">Cottage</option>
              <option value="Townhouse">Town house</option>
              <option value="Mansion">Mansion</option>
            </select>
          </label> */}


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

        <div className={styles.threeColumn}>

          <label>
            Living room
            <select
              name="LivingRoom"
              value={form.LivingRoom}
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
            Tenure of Property
            <select
              name="TenureOfProperty"
              value={form.TenureOfProperty}
              onChange={handleChange}
              defaultValue="select"
            >
              <option value="select">Select</option>
              <option name="Freehold" value="Freehold">Freehold</option>
              <option name="Leasehold" value="Leasehold">Leasehold</option>
            </select>
          </label>
          <label>
            Size
            <input name="size"
              placeholder="size in square feet"
              value={form.size}
              onChange={handleChange} />
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
            <Autocomplete
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </label>


          <label>
            Address
            <Autocomplete
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
            <option name="USD" value="USD">
              USD
            </option>
            <option name="EUR" value="EUR">
              EUR
            </option>
            <option name="GBP" value="GBP">
              GBP
            </option>
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
  handleUpload,
  handleImageChange,
  fileInputs,
  addImageInput,
  showUploadMessage,
  url,
  setForm,
  handleFloorPlanUpload
}) => {
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
          <MultiInput form={form} setForm={setForm} />
        </label>

        <div className={styles.twoColumn}>
          <label>
            Video Link
            <Input
              name="video_link"
              value={form.video_link}
              onChange={handleChange}
              addonBefore="http://"
              placeholder="Link"
            />
          </label>
          <label>
            Virtual tour link
            <Input
              name="virtual_tour_link"
              value={form.virtual_tour_link}
              onChange={handleChange}
              addonBefore="http://"
              placeholder="Link"
            />
          </label>
        </div>

        {/* <div className={styles.inputFieldContainer}>
            <p>Floor plan</p>
            <div className={styles.uploadContainer}>
              {fileInputs.map((input, index) => (
                <div key={index} id={styles.file_upload}>
                  <label>
                    {input.status === "Upload" &&
                      !input.file &&
                      "Upload Document"}
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    {input.status === "Upload" && input.preview && (
                      <img
                        height={200}
                        width={200}
                        src={input.preview}
                        alt={`Preview ${index}`}
                      />
                    )}
                    {url[index] && (
                      <img
                        height={200}
                        width={200}
                        src={url[index]}
                        alt={`Uploaded ${index}`}
                      />
                    )}
                  </label>
                  {input.status === "Upload" && (
                    <button
                      className={styles.upload}
                      type="button"
                      onClick={() => handleFloorPlanUpload(index)}
                    >
                      {input.status === "Upload" ? (
                        <FaCloudUploadAlt color={"#3572EF"} size={"2.5em"} />
                      ) : null}
                    </button>
                  )}
                  {showUploadMessage[index] && (
                    <FaCheck color={"#40A578"} size={"1em"} />
                  )}
                  <br />
                </div>
              ))}

              <button
                type="button"
                className={styles.addMore}
                onClick={addImageInput}
              >
                <FaPlus size={"2em"} color={"#686D76"} />
              </button>
            </div>
          </div> */}
        <div className={styles.inputFieldContainer}>
          <p>Upload pictures</p>
          <div className={styles.uploadContainer}>
            {fileInputs.map((input, index) => (
              <div key={index} id={styles.file_upload}>
                <label>
                  {!input.file ? "Upload Document" : ""}
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {input.preview && (
                    <img
                      height={200}
                      width={200}
                      src={input.preview}
                      alt={`Preview ${index}`}
                    />
                  )}
                </label>
                {/* {input.status === "Upload" && (
                  <button
                    className={styles.upload}
                    type="button"
                    onClick={() => handleUpload(index)}
                  >
                    {input.status === "Upload" ? (
                      <FaCloudUploadAlt color={"#3572EF"} size={"2.5em"} />
                    ) : null}
                  </button>
                )} */}
                {/* {showUploadMessage[index] && (
                  <FaCheck color={"#40A578"} size={"1em"} />
                )} */}
                <br />
              </div>
            ))}

            <button
              type="button"
              className={styles.addMore}
              onClick={addImageInput}
            >
              <FaPlus size={"2em"} color={"#686D76"} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button onClick={next}>Save & Next</button>
      </div>
    </>
  );
};

const PostPropertyDetailsReview = ({ next, back, form }) => {
  const { loading, setLoading } = useImageContext()
  return (
    <>
      {loading && <Loading />}
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
          <h1>£ {form.Amount}</h1>
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
            {form.Toilets}
          </span>
        </div>

        <hr />
      </div>

      <div className={styles.DetailinfoContainer}>
        <div className={styles.info}>
          <p>{form.Title}</p>
          <p>{form.location}</p>
          <p>{form.description}</p>
        </div>

        <div className={styles.feature}>
          <p>Key features</p>
          <ul>
            {form?.Add_features.map((item, index) => (
              <li style={{ textTransform: "capitalize" }} key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.extraInfo}>
        <p className={styles.readMore}>Read more</p>
      </div>

      <div style={{ gap: 25, flexWrap: "wrap" }} className={styles.DetailImgContainer}>
        {form.images.map((image, index) => (
          <img key={index} src={image} width={210} height={200} alt={`Property image ${index + 1}`} />
        ))}      </div>

      <div className={styles.buttonContainer}>
        <button onClick={next}>Cancel</button>
        <button type="submit">Save & Next</button>
      </div>
    </>
  );
};
const Congratulations = ({ back }) => {
  return (
    <div className={styles.congratulationsSection}>
      <div className={styles.congratulationsContainer}>
        <img src="/congratulations.svg" />
        <p className={styles.congrats}>{"Congratulations !"}</p>
        <p className={styles.congratsText}>You have successfully listed your property</p>
      </div>
    </div>
  );
};


const MultiInput = ({ form, setForm }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      Add_features: todos
    }));
  }, [todos, setForm]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTodo = (index, e) => {
    e.preventDefault();
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className={styles.TodoContainer}>
      <ul className={styles.TodoList}>
        {todos.map((todo, index) => (
          <li key={index} className={styles.TodoItem}>
            {todo}
            <button onClick={(e) => handleRemoveTodo(index, e)} className={styles.RemoveButton}>
              X
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.TodoMultiInput}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo(e);
            }
          }}
          placeholder="Type the features of your property and press Enter"
        />
        <button onClick={handleAddTodo}><FiPlus size={"1.5em"} /></button>
      </div>
    </div>
  );
}



export const Autocomplete = ({ value: inputValue, onChange, name, placeholder, ...props }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: `intimap`,
    requestOptions: {
      // Define search scope here if needed
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    const inputVal = e.target.value;
    setValue(inputVal);  // Update internal state
    if (onChange) {
      onChange(e);  // Notify parent about the input change
    }
  };

  const handleSelect = (suggestion) => {
    const selectedValue = suggestion.description;

    // Set the selected value in the internal state and notify parent
    setValue(selectedValue, false);  // Prevent further autocomplete requests
    clearSuggestions();  // Close the suggestions dropdown

    // Geocode to get lat and lng (optional step)
    getGeocode({ address: selectedValue }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
    });

    // Notify the parent to update the form
    if (onChange) {
      onChange({ target: { name, value: selectedValue } });  // Include name and value for form updates
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={styles.suggestionList}
          onClick={() => handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className={styles.inputContainer}>
      <input
        name={name}  // Ensure the name is passed to the input field
        value={inputValue}  // Controlled input
        onChange={handleInput}  // Handle input and pass changes to parent
        disabled={!ready}
        placeholder={placeholder}
        {...props}  // Spread other props if any
      />
      {status === "OK" && (
        <ul className={styles.suggestionBox}>
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};