import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";
import User from "../../../models/User";

// uupload proof of funds

/**
 * Handles the POST request to add a seller's conveyancer to a transaction.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the `transactionId` and `userid`.
 * @param {string} req.body.transactionId - The ID of the transaction.
 * @param {string} req.body.userid - The ID of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A JSON response indicating the success or failure of the operation.
 */
export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, userId } = req.body;

  if (req.method === "POST") {
    try {
      const tx = await OfferTransaction.findOne({
        _id: transactionId,
      });

      const user = await User.findOne({ _id: userId });
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
              convenyancer_seller: userId,
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
        message: "successful added seller conveyancer",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding seller conveyancer" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
