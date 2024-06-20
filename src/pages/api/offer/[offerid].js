import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";
import Offer from "../../../models/Offers";

/**
 * Handles HTTP requests to the /api/offer/offerid endpoint.
 * Supports the following operations:
 * - DELETE /api/offer/[offerId]: Deletes the offer with the specified ID, if the user is the owner and the offer has not been accepted.
 * - GET /api/offer/[offerId]: Retrieves the offer with the specified ID.
 *
 */
export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { offerid } = req.query;

  if (req.method === "DELETE") {
    try {
      // check if he created the offer
      // check if the offer has been accepted
      const offer = await Offer.findOne({ _id: offerid });

      if (offer.userId !== req.query.userId) {
        res.status(400).json({ message: "You are not the owner of the offer" });
      }

      if (offer.deleted == true) {
        res.status(400).json({ message: "Cannot deleted accepted offer" });
      }

      const update = await Offer.updateOne(
        { _id: req.query.userId },
        {
          $set: {
            deleted: true,
          },
        }
      );

      res
        .status(200)
        .json({ message: "Deleted the offer successfully", update });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching offers" });
    }
  } else if (req.method === "GET") {
    try {
      const offer = await Offer.findOne({ _id: offerid });

      res.status(200).json({
        message: "Gotten offer details successfully",
        offers: offer,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user offers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
