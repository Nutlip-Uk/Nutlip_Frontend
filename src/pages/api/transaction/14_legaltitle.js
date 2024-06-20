import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, offerid, content } = req.body;

  if (req.method === "POST") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      if (tx.transactionCurrentStage != 14) {
        res.status(400).json({
          message: "legal title already uploaded",
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
              legal_title_document: content,
              legal_title_document_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: offerid,
          },
          {
            $set: {
              transactionCurrentStage: 15,
            },
          }
        ),
      ]);

      res.status(200).json({
        message: "suucessfully added legal title",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding legal titlte" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
