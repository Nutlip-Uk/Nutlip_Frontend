import dbConnect from "../../../libs/dbconnect";
import Offer from "../../../models/Offers";

// create an offer
// get all the offers

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  if (req.method === "POST") {
    try {
      const { apartmentId, userId } = req.body;

      const newAddedData = new Offer({
        apartmentId,
        userId,
      });
      await newAddedData.save();

      return res.status(200).json({ message: "Offer created sucessfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating apartment" });
    }
  } else if (req.method === "GET") {
    try {
      const offers = await Offer.find();

      return res
        .status(200)
        .json({ message: "Gotten all offers sucessfully", offers: offers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching apartments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
