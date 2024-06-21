import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";
import User from "../../../models/User";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, userid } = req.body;

  if (req.method === "POST") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      const user = await User.findOne({ _id: userid });
      if (!user) {
        res.status(400).json({
          message: "User doesnt exist",
        });
        return;
      }

      if (tx.transactionCurrentStage != 3) {
        res.status(400).json({
          message: "Seller convenyancer already added",
        });
        return;
      }

      Promise.all([
        await transactionContents.updateOne(
          {
            transaction_id: transactionId,
          },
          {
            $set: {
              convenyancer_seller: userid,
              convenyancer_seller_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 4,
            },
          }
        ),
      ]);

      return res.status(200).json({
        message: "successfully added seller conveyancer",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding seller conveyancer" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
