import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";
import Offer from "../../../../models/Offers";

/**
 * Handles HTTP requests to the /api/offer/getoffersreceived/sellerid endpoint.
 * Supports the following operations:
 * - GET /api/offer/getoffersreceived/[sellerid]: Retrieves the offer a seller has received from different users.
 *
 */

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { sellerid } = req.query;

  if (req.method === "GET") {
    try {
      const offersrUserreceived = await Offer.find({ sellerId: sellerid });

      res.status(200).json({
        message:
          "Gotten the offers this user has received from all property he/she listed",
        offers: offersrUserreceived,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user offers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
