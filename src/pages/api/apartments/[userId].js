//? /api/apartments/id note that the id is dynamic
import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";
import User from "../../../models/User";

/**
 * Handles HTTP requests for the `/api/apartments/{userId}` endpoint.
 * Supports GET, PUT, and DELETE operations on apartment resources.
 *
 * GET /api/apartments/{userId}: Retrieves an apartment by its ID.
 * PUT /api/apartments/{userId}: Updates an existing apartment by its ID.
 * DELETE /api/apartments/{userId}: Deletes an apartment by its ID.
 *
 */
export default async function handler(req, res) {
  const { userId } = req.query;
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get an apartment */:
      try {
        // Fetch apartments where the userId matches the provided userId
        const apartments = await Apartment.findById({ userId });
        if (!apartments) {
          return res.status(404).json({ message: "Apartment not found" });
        }
        res.status(200).json(apartments);
        console.log(apartments);
      } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: "Error fetching apartments" });
      }
      break;

    case "DELETE" /* Delete an apartment */:
      try {
        const deletedApartment = await Apartment.deleteOne({ _id: id });
        if (!deletedApartment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
