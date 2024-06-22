import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionBool from "../../../models/TransactionBool";
import transactionContents from "../../../models/TransactionContent";

// uupload proof of funds

/**
 * Handles the upload of proof of funds for a transaction.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the transaction details.
 * @param {string} req.body.content - The content of the proof of funds.
 * @param {string} req.body.transactionId - The ID of the transaction.
 * @param {string} req.method - The HTTP method of the request.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
  await dbConnect();

  const { content, transactionId } = req.body;

  if (req.method === "PUT") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      if (content == "") {
        res.status(400).json({
          message: "Content can't be an empty string",
        });
        return;
      }
      if (tx.transactionCurrentStage != 1) {
        res.status(400).json({
          message: "Content for proof already uploaded",
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
              proof_of_funds: content,
              proof_of_funds_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 2,
            },
          }
        ),
      ]);

      return res.status(200).json({
        message: "successfully uploaded proof of funds",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading proof of funds" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
