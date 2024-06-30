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
      const transactioncontent = await transactionContents.findOne({
        transaction_id: txcontentid,
      });

      return res.status(200).json({
        message: "Transaction Content gotten successfully",
        transactioncontent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting transactions content" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
