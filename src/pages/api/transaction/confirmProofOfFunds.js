import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionBool from "../../../models/TransactionBool";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { content, transactionId } = req.body;

  if (req.method === "GET") {
    try {
      const transactionBool = await transactionBool.findOne({
        _id: transactionId,
      });

      return res.status(200).json({
        message: "suucessfully confirmed proof of funds",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error confirming proof of funds" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
