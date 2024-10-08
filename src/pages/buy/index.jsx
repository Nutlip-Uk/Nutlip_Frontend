import Home from "../../components/Rent/Index";
import styles from "../../styles/buy/buy.module.css";
import { motion } from "framer-motion";
import BuyImage from "../../../public/buyimage.png";
import mort_con from "../../styles/Home/Mortgage_Conveyancer.module.css";
import { useRouter } from 'next/router';
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Browse from "../../components/buy/Browse";
import Roadmap from "../../components/buy/Roadmap";
import Road from "../../components/buy/Road";
import Howitworks from "../../components/buy/Howitworks";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const Buy = (props) => {
  return (
    <>
      <section className={styles.Section}>
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${BuyImage})` }}
        >

          <div className={styles.Textcontainer}>
            <div className={styles.Text}>
              <h2>Get the keys to your new home 3x faster </h2>
              <p>At Nutlip we know there is a better way to buy a home with ease and 60% faster than the traditional methods.</p>
            </div>
          </div>

          <div className={styles.HeroCompContainer}>
            <HeroComponent placeholder="Where do you want to Buy? e.g. Liverpool or L11" />
          </div>

        </div>
        <Howitworks />
        <Roadmap />
        <Browse />
        <Road />
      </section>
    </>
  );
};




export default Buy;

const HeroComponent = () => {
  const router = useRouter();
  return (
    <>
      <form className={styles.Herocontainer}>
        <div className={styles.inputContainer}>
          {/* <input
            type="text"
            placeholder="Where do you want to Buy? e.g. Liverpool or L11"
          /> */}

          <Autocomplete placeholder={"Where are you buying from ? "} />
        </div>

        <div className={styles.SelectContainer}>
          {/* <input list='radius' placeholder='Radius'/> */}
          <Select
            name="duration"
            //  value={formData.duration}
            //  onChange={handleChange}
            className={styles.muti}
            multiple
            placeholder={["View type e.g video, virtual tour"]}
          >
            <Option value="Picture">Picture</Option>
            <Option value="Video">Video</Option>
            <Option value="Virtual Tour">Virtual Tour</Option>

            {/* <option value="" className='disabled'>This area only</option> */}
          </Select>
        </div>

        <a

          onClick={() => router.push(`/buy/search`)}
          id="search"
          className={styles.searchButton}
        >
          To Buy
        </a>
      </form>
    </>
  );


};

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
          className={`text-lg text-neutral-700`}
          onClick={() => handleSelect(suggestion)}
        >
          <strong className="font-medium">{main_text}</strong> <small className="italic text-neutral-500 text-xs">{secondary_text}</small>
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
        <ul className={`absolute bg-white w-full z-10 shadow-xl p-4 rounded-lg  border border-neutral-200 flex flex-col gap-2`}>
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};