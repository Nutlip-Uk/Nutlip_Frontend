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

      if (tx.transactionCurrentStage != 7) {
        res.status(400).json({
          message: "contract already uploaded",
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
              payment_of_nutlip_commision: true,
              payment_of_nutlip_commision_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 8,
            },
          }
        ),
      ]);

      return res.status(200).json({
        message: "suucessfully completed research and survey",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error completing research and survery" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
