import UserType from "../../../../models/UserTypes";
import connectDB from "../../../../libs/dbconnect";


// uupload proof of funds

export default async function handler(req, res) {
  await connectDB();

  const { transactionId, userid } = req.body;

  if (req.method === "POST") {
    try {
      const conveyancers = await UserType.aggregate([
        { $match: { type: "Conveyancer" } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "conveyancers",
          },
        },
        {
          $project: {
            "$conveyancers.password": 0,
          },
        },
      ]);

      return res.status(200).json({
        message: "successfully gotten all conveyancers",
        conveyancers: conveyancers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding seller conveyancer" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
