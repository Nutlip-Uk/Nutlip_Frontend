// pages/api/user/[userId].js
import dbConnect from "../../../libs/dbconnect";
import User from "../../../models/User";
// import { getSession } from "next-auth/react";

/**
 * Handles HTTP requests to the `/api/user/[userId]` endpoint.
 *
 * Supports the following HTTP methods:
 * - `GET`: Retrieves the user with the specified `userId`.
 * - `PUT`: Updates the user with the specified `userId` with the provided `username` and `email`.
 * - `DELETE`: Deletes the user with the specified `userId`.
 *
 * The endpoint requires authentication. Only the user with the matching `userId` is allowed to access their own data.
 *
//  * @param {import('next').NextApiRequest} req - The incoming HTTP request.
//  * @param {import('next').NextApiResponse} res - The HTTP response to be sent back.
//  * @returns {Promise<void>} - The response is sent directly from the function.
 */
export default async function handler(req, res) {
  await dbConnect();
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  const { userId } = req.query;

  if (session.user.id !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.method === "GET") {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
