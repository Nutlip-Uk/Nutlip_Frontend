import dbConnect from "../../../../libs/dbconnect";
import Offer from "../../../../models/Offers";
import OfferTransaction from "../../../../models/Transaction";
import transactionContents from "../../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();
  // console.log(Apartment);
  const { txcontentid } = req.query;

  if (req.method === "GET") {
    try {
      const transactioncontents = await transactionContents.find();

      return res.status(200).json({
        message: "Transaction Contents gotten successfully",
        transactioncontents,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting transactions content" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
