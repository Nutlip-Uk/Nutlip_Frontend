//? /api/privatelisting this api only works for getting all requests nd making a post req
import dbConnect from "../../../libs/dbconnect";
import Listing from "../../../models/PrivateListing";
// import { getSession } from "next-auth/react";

/**
 * Handler function for /api/privatelisting endpoint.
 * Supports GET and POST methods.
 * GET: Fetches all private listings from the database.
 * POST: Creates a new private listing based on request body.
 */
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  //   const session = await getSession({ req });

  //   if (!session) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }

  switch (method) {
    case "GET":
      try {
        const apartments = await Listing.find({});
        res.status(200).json({ success: true, data: apartments });
        console.log(apartments);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      // if (!session) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }
      try {
        const apartment = await Listing.create(req.body);
        res.status(201).json({ success: true, data: apartment });
        console.log(apartment);
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
