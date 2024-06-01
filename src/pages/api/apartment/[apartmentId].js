import dbConnect from "../../../libs/dbconnect";
import Apartment from "../../../models/Apartment";

export default async function handler(req, res) {
  const { apartmentId } = req.query;
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
          return res.status(404).json({ message: "Apartment not found" });
        }
        res.status(200).json(apartment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching apartment" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
