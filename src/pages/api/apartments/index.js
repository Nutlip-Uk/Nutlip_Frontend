// api/apartments.js

import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  if (req.method === "POST") {
    //console.log("Request body:", req.body);
    // Create apartment logic
    //const userId = req.userId; // Get the user ID from the request object
    const {
      userId,
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
      TenureOfProperty,
      bedrooms,
      bathrooms,
      Toilets,
      size,
      livingRoom,
      PCW,
      PCM,
      stateOfProperty,
      // name,
      description,
      Amount,
      Minimum_offer,
      Currency,
      Add_features,
      video_link,
      virtual_tour_link,
    } = req.body;

    try {
      const newApartment = await Apartment.create({
        userId,
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
        TenureOfProperty,
        bedrooms,
        bathrooms,
        Toilets,
        size,
        livingRoom,
        PCW,
        PCM,
        stateOfProperty,
        // name,
        description,
        Amount,
        Minimum_offer,
        Currency,
        Add_features,
        video_link,
        virtual_tour_link,
      });

      // Validate request body
      // const { error } = validateApartmentInput(req.body);
      // if (error) {
      //   return res.status(400).send(error.details[0].message);
      // }
      // Update the user's Apartment field with the new Apartment document's ID
      // await User.findByIdAndUpdate(userId, {
      //   $push: { Apartment: newApartment._id },
      // });

      await newApartment.save();
      res.status(201).json(newApartment);
      console.log(newApartment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating apartment" });
    }
  } else if (req.method === "GET") {
    // Fetch apartments logic
    // add query data
    try {
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
      console.log(apartments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
