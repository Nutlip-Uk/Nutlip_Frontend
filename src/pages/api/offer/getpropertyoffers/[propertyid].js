import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";
import Offer from "../../../../models/Offers";

/**
 * Handles HTTP requests to the /api/offer/getpropertyoffers/apartmentid endpoint.
 * Supports the following operations:
 * - GET /api/offer/getpropertyoffers/[apartmentid]: Retrieves the offers for a property.
 *
 */
export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { apartmentid } = req.query;

  if (req.method === "GET") {
    try {
      const offersForProperty = await Offer.find({ apartmentId: apartmentid });

      res.status(200).json({
        message: "Gotten the offers that belongs to a property",
        offers: offersForProperty,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user offers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
