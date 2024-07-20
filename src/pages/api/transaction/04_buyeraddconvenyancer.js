import dbConnect from "../../../libs/dbconnect";
import OfferTransaction from "../../../models/Transaction";
import transactionContents from "../../../models/TransactionContent";
import User from "../../../models/User";

// uupload proof of funds

export default async function handler(req, res) {
  await dbConnect();

  const { transactionId, userid } = req.body;

  if (req.method === "PUT") {
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

     

      Promise.all([
        await transactionContents.updateOne(
          {
            transaction_id: transactionId,
          },
          {
            $set: {
              convenyancer_buyer: userid,
              convenyancer_buyer_date: Date.now(),
            },
          }
        ),
        await OfferTransaction.updateOne(
          {
            _id: transactionId,
          },
          {
            $set: {
              transactionCurrentStage: 5,
            },
          }
        ),
      ]);

      return res.status(200).json({
        message: "suucessfully added buyer conveyancer",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding buyer conveyancer" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
