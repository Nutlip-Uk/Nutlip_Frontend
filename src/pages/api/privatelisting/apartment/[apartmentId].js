//todo api/privatelisting/apartment/[apartmentId].js;

import dbConnect from "../../../../libs/dbconnect";
import PrivateListing from "../../../../models/PrivateListing";

/**
 * Handles HTTP requests for a private listing apartment by its ID.
 *
 * Supports the following HTTP methods:
 * - GET: Retrieves the details of the apartment with the specified ID.
 *
 * @param {import('next').NextApiRequest} req - The incoming HTTP request.
 * @param {import('next').NextApiResponse} res - The HTTP response to be sent back.
 */
export default async function handler(req, res) {
  const { apartmentId } = req.query;
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const apartment = await PrivateListing.findById(apartmentId);
        if (!apartment) {
          return res.status(404).json({ message: "Apartment not found" });
        }
        res.status(200).json(apartment);
      } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: "Error fetching apartment" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
