
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "../styles/suggestion.module.css";

const PlacesAutocomplete = ({ placeholder }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (description) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
    });
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={index}>
          <li
            className={styles.suggestionList}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        </div>
      );
    });

  return (
    <>
      <div ref={ref} className={styles.inputContainer}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={placeholder}
        />

        {status === "OK" && (
          <ul className={styles.suggestionBox}>{renderSuggestions()}</ul>
        )}
      </div>
    </>
  );
};

export default PlacesAutocomplete;