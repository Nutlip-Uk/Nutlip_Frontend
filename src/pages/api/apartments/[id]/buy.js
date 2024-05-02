// pages/api/apartments/[id]/buy.js

import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";

/**
 * Handler for PUT /api/apartments/[id]/buy endpoint.
 *
 * Checks if apartment with given id exists and is not already sold.
 * If valid, marks apartment as sold and saves to DB.
 *
 * Returns:
 * - 404 if apartment not found
 * - 400 if already sold
 * - 200 if purchased successfully
 * - 405 if method not PUT
 * - 500 on any error
 */
export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "PUT") {
    try {
      // Get apartment
      const apartment = await Apartment.findById(id);

      if (!apartment) {
        return res.status(404).json({ message: "Apartment not found" });
      }

      // Check if already sold
      if (apartment.isSold) {
        return res.status(400).json({ message: "Apartment already sold" });
      }

      // Mark as sold and save
      apartment.isSold = true;
      await apartment.save();

      res.status(200).json({ message: "Apartment purchased successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error purchasing apartment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
