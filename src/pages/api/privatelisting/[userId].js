//? /api/privatelisting/id note that the id is dynamic
import dbConnect from "../../../libs/dbconnect";
import PrivateListing from "../../../models/PrivateListing";

/**
 * Handles HTTP requests to the `/api/privatelisting/{userId}` endpoint.
 *
 * Supports the following HTTP methods:
 * - `GET`: Fetches a private listing by the provided `userId`.
 * - `PUT`: Updates a private listing by the provided `userId`.
 * - `DELETE`: Deletes a private listing by the provided `userId`.
 *
 * @param {import('next').NextApiRequest} req - The incoming HTTP request.
 * @param {import('next').NextApiResponse} res - The HTTP response to send back.
 */
export default async function handler(req, res) {
  const { userId } = req.query;
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get an apartment */:
      try {
        // Fetch apartments where the userId matches the provided userId
        const newPrivateListing = await PrivateListing.findOne({ userId });
        if (!newPrivateListing) {
          return res.status(404).json({ message: "Apartment not found" });
        }
        res.status(200).json(newPrivateListing);
        console.log(newPrivateListing);
      } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: "Error fetching apartments" });
      }
      break;

    case "PUT" /* Edit an apartment */:
      try {
        const newPrivateListing = await PrivateListing.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!newPrivateListing) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: newPrivateListing });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete an apartment */:
      try {
        const deletedApartment = await PrivateListing.deleteOne({ _id: id });
        if (!deletedApartment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
