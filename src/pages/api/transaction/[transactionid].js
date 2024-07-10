import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import Apartment from "../../../models/Apartment";
import { $where } from "../../../models/TransactionContent";

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { transactionid } = req.query;

  if (req.method === "GET") {
    try {
      const testMatchResult = await OfferTransaction.find({
        _id: transactionid,
      }).limit(1);
      console.log("Test Match Result:", testMatchResult);
      const apartments = await Apartment.find();
      console.log(apartments);

      const transaction = await OfferTransaction.aggregate([
        {
          $match: {
            $expr: {
              $eq: [
                "$_id",
                {
                  $toObjectId: transactionid,
                },
              ],
            },
          },
        },
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

      return res.status(200).json({
        message: "Transaction data gotten successfully",
        transaction: transaction[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting the transactions data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
