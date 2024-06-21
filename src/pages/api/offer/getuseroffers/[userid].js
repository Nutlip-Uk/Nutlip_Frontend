import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";
import Offer from "../../../../models/Offers";

/**
 * Handles HTTP requests to the /api/offer/userid endpoint.
 * Supports the following operations:
 * - GET /api/offer/getuseroffers/[userid]: Retrieves the offer made by a user.
 *
 */
export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { userid } = req.query;

  if (req.method === "GET") {
    try {
      const offersForUser = await Offer.find({ userId: userid });

      res.status(200).json({
        message: "Gotten the user offers successfully",
        offers: offersForUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user offers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
