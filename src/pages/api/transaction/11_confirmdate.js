import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, offerId } = req.body;

  if (req.method === "POST") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      // if (tx.transactionCurrentStage != 11) {
      //   res.status(400).json({
      //     message: "already confirmed set date",
      //   });
      //   return;
      // }

      Promise.all([
        await transactionContents.updateOne(
          {
            transaction_id: transactionId,
          },
          {
            $set: {
              agreeded_on_completion_date_buyer: true,
              agreeded_on_completion_date_buyer_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: offerId,
          },
          {
            $set: {
              transactionCurrentStage: 12,
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
