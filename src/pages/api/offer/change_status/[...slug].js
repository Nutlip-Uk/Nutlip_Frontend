import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";
import Offer from "../../../../models/Offers";

// get offer belonging to a user
// delete offer belonging to user

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "PUT") {
    try {
      const { slug } = req.query;
      const { status } = req.body;

      if (status == "accepted") {
        const apartment = await Apartment.findOne({ _id: slug[0] });
        if (apartment.isAccepted == true) {
          res.status(400).json({
            message: "Property already has an accepted offer",
          });
        }
      }

      await Promise.all([
        Offer.updateOne(
          { _id: slug[1] },
          {
            $set: {
              status: status,
            },
          }
        ),
        Apartment.updateOne(
          { _id: slug[0] },
          {
            $set: {
              isAccepted: true,
            },
          }
        ),
      ]);
      res.status(200).json({
        message: `Success - ${status}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user offers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
