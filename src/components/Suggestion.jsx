import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "../styles/suggestion.module.css";

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