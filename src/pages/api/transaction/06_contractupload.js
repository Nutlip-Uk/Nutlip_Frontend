import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, content } = req.body;

  if (req.method === "PUT") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      if (tx.transactionCurrentStage != 6) {
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
              contract_upload: content,
              contract_upload_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 7,
            },
          }
        ),
      ]);
      return res.status(200).json({
        message: "suucessfully uploaded contract",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading contract" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
