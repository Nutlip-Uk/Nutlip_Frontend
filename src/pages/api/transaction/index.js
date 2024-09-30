import dbConnect from "../../../libs/dbconnect";
import Offer from "../../../models/Offers";
import OfferTransaction from "../../../models/Transaction";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  if (req.method === "GET") {
    try {
      const transactions = await OfferTransaction.aggregate([
        {
          $lookup: {
            from: "offers",
            localField: "offerId",
            foreignField: "_id",
            as: "offer",
          },
        },
        {
          $unwind: {
            path: "$offer",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return res
        .status(200)
        .json({ message: "Transactions gotten successfully", transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting all transactions" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
