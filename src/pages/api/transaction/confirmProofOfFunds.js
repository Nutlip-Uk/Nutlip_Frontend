import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId } = req.body;

  if (req.method === "POST") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      if (tx.transactionCurrentStage != 2) {
        res.status(400).json({
          message: "Proof Of funds already confirmed",
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
              confirm_proof_of_funds: true,
              confirm_proof_of_funds_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 3,
            },
          }
        ),
      ]);

      return res.status(200).json({
        message: "suucessfully confirm proof of funds",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading proof of funds" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
