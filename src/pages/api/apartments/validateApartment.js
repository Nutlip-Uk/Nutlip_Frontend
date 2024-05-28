import mongoose from "mongoose";
import Apartment from "../../../models/Apartment";

export const validateApartment = async (apartment) => {
  try {
    const validatedApartment = await mongoose.model("Apartments").validateSync(
      apartment,
      {
        abortEarly: false,
      }
    );
    return { error: null, validatedApartment };
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = error.errors;
      const validationErrors = Object.keys(errors).map((key) => ({
        field: key,
        message: errors[key].message,
      }));
      return { error: validationErrors };
    } else {
      return { error: [{ message: error.message }] };
    }
  }
};
