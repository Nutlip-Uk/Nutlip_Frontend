// api/apartments.js

import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";

export default async function handler(req, res) {
  await dbConnect();
  console.log(Apartment);
  if (req.method === "POST") {
    // Create apartment logic

    const {
      //  owner,
      Title,
      purpose,
      location,
      price,
      images,
      address,
      Landmark,
      Radius,
      city,
      typeOfProperty,
      subTypeOfProperty,
      bedrooms,
      bathrooms,
      Toilets,
      size,
      stateOfProperty,
      // name,
      description,
      Amount,
      Minimum_offer,
      Currency,
      Add_features,
      video_link,
      // virtual_tour_link,
    } = req.body;

    try {
      const newApartment = await Apartment({
        // owner,
        Title,
        purpose,
        location,
        price,
        // rating,
        images,
        address,
        Landmark,
        Radius,
        city,
        typeOfProperty,
        subTypeOfProperty,
        bedrooms,
        bathrooms,
        Toilets,
        size,
        stateOfProperty,
        // name,
        description,
        Amount,
        Minimum_offer,
        Currency,
        Add_features,
        video_link,
        // virtual_tour_link,
      });

      // Validate request body
      // const { error } = validateApartmentInput(req.body);
      // if (error) {
      //   return res.status(400).send(error.details[0].message);
      // }

      res.status(201).json(newApartment);
      await newApartment.save();
      console.log(newApartment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating apartment" });
    }
  } else if (req.method === "GET") {
    // Fetch apartments logic

    try {
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
