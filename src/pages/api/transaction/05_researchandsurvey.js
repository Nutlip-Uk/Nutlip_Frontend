import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId } = req.body;

  if (req.method === "PUT") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      if (tx.transactionCurrentStage != 5) {
        res.status(400).json({
          message: "researched survery already done",
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
              researched: true,
              researched_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 6,
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
