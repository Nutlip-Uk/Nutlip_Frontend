// api/apartments.js

import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import isAuthenticated from "../../../middleware/verifyToken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch all apartments
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else if (req.method === "POST") {
    try {
      isAuthenticated(req, res, async () => {
        // code will work only when user is authenticated
        const userId = req.userId; // Get the user ID from the request object

        const {
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
          livingRoom,
          PCW,
          PCM,
          stateOfProperty,
          description,
          Amount,
          Minimum_offer,
          Currency,
          Add_features,
          video_link,
        } = req.body;

        const newApartment = await Apartment.create({
          userId: User._id,
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
          livingRoom,
          PCW,
          PCM,
          stateOfProperty,
          description,
          Amount,
          Minimum_offer,
          Currency,
          Add_features,
          video_link,
        });

        // Update the user's Apartment field with the new Apartment document's ID
        await User.findByIdAndUpdate(userId, {
          $push: { Apartment: newApartment._id },
        });

        res.status(201).json(newApartment);
      });
    } catch (error) {
      // If the token is invalid or expired, return an error
      console.log(error);
      console.error(error);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// import dbConnect from "../../../libs/dbconnect";
// import Apartment from "../../../models/Apartment";
// import jwt from "jsonwebtoken";
//
// export default async function handler(req, res) {
//   await dbConnect();

//   // Check if the request has an Authorization header
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization header missing" });
//   }

//   // Extract the token from the Authorization header
//   const token = authHeader.split(" ")[1];

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id; // Get the user ID from the decoded token

//     if (req.method === "POST") {
//       const {
//         Title,
//         purpose,
//         location,
//         price,
//         images,
//         address,
//         Landmark,
//         Radius,
//         city,
//         typeOfProperty,
//         subTypeOfProperty,
//         bedrooms,
//         bathrooms,
//         Toilets,
//         size,
//         stateOfProperty,
//         description,
//         Amount,
//         Minimum_offer,
//         Currency,
//         Add_features,
//         video_link,
//       } = req.body;

//       try {
//         const newApartment = await Apartment.create({
//           Title,
//           purpose,
//           location,
//           price,
//           images,
//           address,
//           Landmark,
//           Radius,
//           city,
//           typeOfProperty,
//           subTypeOfProperty,
//           bedrooms,
//           bathrooms,
//           Toilets,
//           size,
//           stateOfProperty,
//           description,
//           Amount,
//           Minimum_offer,
//           Currency,
//           Add_features,
//           video_link,
//           owner: userId, // Set the owner of the apartment to the authenticated user
//         });

//         res.status(201).json(newApartment);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error creating apartment" });
//       }
//     } else if (req.method === "GET") {
//       // Fetch apartments logic

//       try {
//         const apartments = await Apartment.find();
//         res.status(200).json(apartments);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error fetching apartments" });
//       }
//     } else {
//       res.status(405).json({ message: "Method not allowed" });
//     }
//   } catch (error) {
//     // If the token is invalid or expired, return an error
//     console.error(error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// }
