//? /api/privatelisting this api only works for getting all requests nd making a post req

import dbConnect from "../../../libs/dbconnect";
import PrivateListing from "../../../models/PrivateListing";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  if (req.method === "POST") {
    // Create apartment logic
    //const userId = req.userId; // Get the user ID from the request object
    const {
      userId,
      StreetAddress,
      PostalCode,
      country,
      YearBuilt,
      Title,
      Appliances,
      Basement,
      FloorCovering,
      Utility_types,
      Heating_types,
      Heating_fuel,
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
      Rooms,
      Toilets,
      size,
      stateOfProperty,
      description,
      Amount,
      Minimum_offer,
      Currency,
      Add_features,
      video_link,
      virtual_tour_link,
      PhoneNumber,
      preferred_email_address,
    } = req.body;

    try {
      const newPrivateListing = await PrivateListing({
        userId,
        StreetAddress,
        PostalCode,
        country,
        YearBuilt,
        Title,
        Appliances,
        Basement,
        FloorCovering,
        Utility_types,
        Heating_types,
        Heating_fuel,
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
        Rooms,
        Toilets,
        size,
        stateOfProperty,
        description,
        Amount,
        Minimum_offer,
        Currency,
        Add_features,
        video_link,
        virtual_tour_link,
        PhoneNumber,
        preferred_email_address,
      });

      await newPrivateListing.save();
      res.status(201).json(newPrivateListing);
      console.log(newPrivateListing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating apartment" });
    }
  } else if (req.method === "GET") {
    // Fetch apartments logic

    try {
      const newPrivateListing = await PrivateListing.find();
      res.status(200).json(newPrivateListing);
    } catch (error) {
      console.log(error);
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
