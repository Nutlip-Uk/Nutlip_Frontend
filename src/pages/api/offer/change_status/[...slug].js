import dbConnect from "../../../../libs/dbconnect";
import Apartment from "../../../../models/Apartment";
import Offer from "../../../../models/Offers";
import OfferTransaction from "../../../../models/Transaction";
import transactionContents from "../../../../models/TransactionContent";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "PUT") {
    try {
      const { slug } = req.query;
      const { status } = req.body;

      console.log(slug);
      // 0 = property Id, 1 = offer id, 2 = userId

      if (status == "accepted") {
        const apartment = await Apartment.findOne({ _id: slug[0] });
        // if (apartment.isAccepted == true) {
        //   res.status(400).json({
        //     message: "Property already has an accepted offer",
        //   });
        //   return;
        // }

        const tx = new OfferTransaction({
          offerId: slug[1],
          userId: slug[2],
          ApartmentId: slug[0],
        });

        const contents = new transactionContents({
          transaction_id: tx._id,
        });

        await Promise.all([
          tx.save(),
          contents.save(),
          await Offer.updateOne(
            { _id: slug[1] },
            {
              $set: {
                transaction_id: tx._id,
              },
            }
          ),
          await Apartment.updateOne(
            { _id: slug[0] },
            {
              $set: {
                transaction_id: tx._id,
                isAccepted: true,
              },
            }
          ),
        ]);
      }

      await Promise.all([
        Offer.updateOne(
          { _id: slug[1] },
          {
            $set: {
              status: status,
              offerCheckedDate: Date.now(),
            },
          }
        ),
        ,
      ]).catch((error) => {
        console.error(error.message);
      });

      res.status(200).json({
        message: `Successfully set status to - ${status}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Error changing status" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
