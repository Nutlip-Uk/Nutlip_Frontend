import dbConnect from "../../../libs/dbconnect";
import Offer from "../../../models/Offers";

// create an offer
// get all the offers

/**
 * Handles HTTP requests to the /api/offer endpoint.
 *
 * Supports the following HTTP methods:
 * - POST: Creates a new offer with the provided `apartmentId`, `userId`, and `offerPrice`.
 * - GET: Retrieves all existing offers.
 *
 * @param {import('next').NextApiRequest} req - The incoming HTTP request.
 * @param {import('next').NextApiResponse} res - The HTTP response to be sent back.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 */
export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  if (req.method === "POST") {
    try {
      const {
        offerPrice,
        apartmentId,
        sellerId,
        userId,
        FullName,
        Address,
        Interested,
        PriceOffer,
        NutlipCommission,
        receivedPayment,
        PaymentType,
        cryptoType,
      } = req.body;

      const newAddedData = new Offer({
        offerPrice,
        apartmentId,
        sellerId,
        userId,
        FullName,
        Address,
        Interested,
        PriceOffer,
        NutlipCommission,
        receivedPayment,
        PaymentType,
        cryptoType,
      });
      await newAddedData.save();

      res.status(200).json({ message: "Offer created sucessfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating apartment" });
    }
  } else if (req.method === "GET") {
    try {
      const offers = await Offer.find();

      res
        .status(200)
        .json({ message: "Gotten all offers successfully", offers: offers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
