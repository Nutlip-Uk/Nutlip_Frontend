import UserType from "../../../../models/UserType";
import connectDB from "../../../../libs/dbconnect";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const conveyancers = await UserType.aggregate([
        { $match: { type: "Conveyancer" } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "conveyancer",
          },
        },
        {
          $unwind: {
            path: "$conveyancer",
          },
        },
        {
          $project: {
            "conveyancer.password": 0,
          },
        },
      ]);

      return res.status(200).json({
        message: "successfully gotten all conveyancers",
        conveyancers: conveyancers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting conveyancers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}